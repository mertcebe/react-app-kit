import { get, ref } from 'firebase/database';
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import database, { auth } from '../firebase/myFirebaseConfig';

const HomePage = () => {
    return (
        <div>
            Home Page
        </div>
    )
}

export default HomePage