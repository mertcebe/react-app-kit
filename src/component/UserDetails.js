import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const UserDetails = () => {
    let [name, setName] = useState("");
    let [surname, setSurname] = useState("");
    let [email, setEmail] = useState("");
    let dispatch = useDispatch();
    const submit = () => {
        dispatch({
            type: "ADD_USER",
            payload: {
                name: name,
                surname: surname,
                email: email
            }
        })
    }

    let user = useSelector((state) => {
        return state.signIn
    })

    useEffect(() => {
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
    }, []);

    return (
        <div className='container' style={{ width: "300px" }}>
            <h4 className='bg-primary text-light'>Enter User Details</h4>
            <form>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} className="form-control" id="exampleInputName1" placeholder="Enter name" />
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="exampleInputSurname1">Surname</label>
                    <input type="text" value={surname} onChange={(e) => {
                        setSurname(e.target.value)
                    }} className="form-control" id="exampleInputSurname1" placeholder="Enter surname" />
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <div className="d-flex justify-content-evenly mt-4">
                    {name && surname && email ? <NavLink to={`personal`} onClick={submit} className="btn btn-primary">Continue</NavLink> : <NavLink to={`personal`} onClick={submit} className="btn btn-primary disabled">Continue</NavLink>}
                </div>
            </form>
        </div>
    )
}

export default UserDetails