import React, { useReducer, useState } from 'react'
import appImage1 from '../logo/appImage1.jpg'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import database, { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword, sendPasswordResetEmail, signInWithRedirect } from '../firebase/myFirebaseConfig'
import { get, ref, set } from 'firebase/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyDiv = styled.div({
    width: "70%",
    padding: "30px"
})

const SignInPage = ({ signIn, register, forgotPassword }) => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let navigate = useNavigate();

    const submitWithGoogle = () => {
        signInWithRedirect(auth, provider).then(() => {
            set(ref(database, `users/${auth.currentUser.uid}`), { email: auth.currentUser.email, name: auth.currentUser.displayName })
            navigate("/");
        })
    }

    const submitFunc = (e) => {
        e.preventDefault();
        if (register) {
            submitForUp();
        }
        else if (forgotPassword) {
            submitForForgot();
        }
        else if (signIn) {
            submitForIn();
        }
    }

    const submitForIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.uid + " have just sign in!");
                navigate("/");
            })
            .catch((err) => {
                toast.error("Something went wrong with the sign in");
            })
    }

    const submitForUp = async () => {
        try {
            let userCredentials = createUserWithEmailAndPassword(auth, email, password);
            // let user = "";
            let user = (await userCredentials).user
            // await userCredentials.then((snapshot) => {
            //     user = snapshot.user;
            // })

            updateProfile(auth.currentUser, {
                displayName: name
            });

            const formData = { name, email };
            set(ref(database, `users/${user.uid}`), formData);

            navigate("/sign-in");
            toast.success("Sign up with successfully!");
        } catch (error) {
            toast.error("Something went wrong with the registration");
        }
    }

    const submitForForgot = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success("Email just send successfully!");
        })
            .catch(() => {
                toast.error("Email couldn't send!");
            })
    }

    return (
        <div className='d-flex justify-content-between align-items-center'>
            <MyDiv>
                <img className='w-100 rounded' src={appImage1} alt="" />
            </MyDiv>
            <form className='w-50 p-5 m-5 text-center' onSubmit={submitFunc}>
                {
                    forgotPassword ?
                        <>
                            <h4 className='mb-5'>Forgot Password</h4>
                            <div className="form-group mb-3">
                                <input type="email" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <small className='d-block'>Don't have an account? <Link to='/register' className='text-danger'>Register</Link></small>
                                <Link to='/sign-in' className='d-block'>Sign in instead</Link>
                            </div>
                            <button type="submit" className="btn btn-info mt-4">Send reset email</button>
                        </>
                        :
                        <>
                            <h4 className='mb-5'>{register ? "Sign Up" : "Sign In"}</h4>
                            {
                                register ?
                                    <div className="form-group mb-3">
                                        <input type="text" onChange={(e) => {
                                            setName(e.target.value);
                                        }} className="form-control" placeholder="Full name" />
                                    </div>
                                    :
                                    <></>
                            }
                            <div className="form-group mb-3">
                                <input type="email" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} className="form-control" placeholder="Password" />
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                {register ? <small className='d-block'>Already have an account? <Link to='/sign-in' className='text-danger'>Sign in</Link> </small> : <small className='d-block'>Don't have an account? <Link to='/register' className='text-danger'>Register</Link> </small>}
                                <Link to='/forgot-password' className='d-block'>Forgot password!</Link>
                            </div>
                            <button type="submit" className="btn btn-info mt-4">{register ? "Sign Up" : "Sign In"}</button>
                        </>
                }

                <p className='my-2'>or</p>
                <div className='btn btn-dark' onClick={submitWithGoogle}>Continue with Google</div>
            </form>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default SignInPage