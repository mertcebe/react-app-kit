import React from 'react'

const User = ({user}) => {
    return (
        <div className="card" style={{ width: "30rem" }}>
            <div className="card-header">
                {user.name} {user.surname}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <small className='d-block' style={{fontSize: "14px"}}><b>Job:</b> {user.job}</small>
                    <small className='d-block' style={{fontSize: "14px"}}><b>Bio:</b> {user.bio}</small>
                    <footer className="blockquote-footer mt-2">{user.email}</footer>
                </blockquote>
            </div>
        </div>
    )
}

export default User