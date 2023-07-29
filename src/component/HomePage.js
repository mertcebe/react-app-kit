import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import User from './User';

const HomePage = () => {
    let users = useSelector((state) => {
        return state.users
    });
    return (
        <div style={{height: "90vh", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "flex-start" }}>
            {users.map((user, index) => {
                return <User key={index} user={user} />
            })}
        </div>
    )
}

export default HomePage