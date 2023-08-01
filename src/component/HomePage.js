import { get, ref } from 'firebase/database';
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import database, { auth } from '../firebase/myFirebaseConfig';

const HomePage = () => {
    useEffect(()=>{
        get(ref(database, "users")).then((snapshot) => {
            console.log(snapshot.val());
        })
        console.log(auth.currentUser);
    }, []);
    return (
        <div>
            Home Page
        </div>
    )
}

export default HomePage