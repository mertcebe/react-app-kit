import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import User from './User';
import styled from 'styled-components'


const Title = styled.h2`
    background: red;
    color: #000;
`;

const MyDiv = styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
`;

const newDiv = styled.div({
    display: "flex"
})

const HomePage = () => {
    let users = useSelector((state) => {
        return state.users
    });
    return (
        <>
            <Title>awd</Title>
            {/* <div style={{height: "90vh", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "flex-start"}}>
                {users.map((user, index) => {
                    return <User key={index} user={user} />
                })}
            </div> */}
            <MyDiv>
                {users.map((user, index) => {
                    return <User key={index} user={user} />
                })}
            </MyDiv>
        </>
    )
}

export default HomePage