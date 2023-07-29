import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { NavLink } from 'react-router-dom';

const Confirm = () => {
    let { name } = useParams();
    let user = useSelector((state) => {
        return state.signIn
    })
    
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const submitFunc = () => {
        dispatch({
            type: "ADD_USER_TO_USERS",
            user: user
        })
        dispatch({
            type: "ADD_USER",
            payload: {
                name: "",
                surname: "",
                email: ""
            }
        })
        dispatch({
            type: "ADD_PERSONAL",
            payload: {
                job: "",
                city: "",
                bio: ""
            }
        })
        navigate('/')
    }

    return (
        <div>
            <div className='text-center d-flex justify-content-center'>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-header">
                        <i>{user.name} {user.surname}</i>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Email: {user.email}</li>
                        <li className="list-group-item">Job: {user.job}</li>
                        <li className="list-group-item">City: {user.city}</li>
                        <li className="list-group-item">Bio: {user.bio}</li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={submitFunc}>Confirm</button>
                <NavLink to={-1} className="btn btn-primary" style={{marginLeft: "10px"}}>Back</NavLink>
            </div>
        </div>
    )
}

export default Confirm