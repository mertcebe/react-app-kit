import React, { useEffect } from 'react'
import { db } from '../firebase/myFirebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ref } from 'firebase/storage';

const ExmplePage = () => {
    useEffect(() => {
        // getDoc(ref(db, `users`))
        // .then((snapshot) => {
        //     console.log(snapshot.data());
        // })
        let storageRef = doc(db, `user/n2iPP0Ntod6LOpsTfG4s`);
        let idQuery = query(
            collection(db, `listings`),
            where("id", "==", "123456")
        )
        getDocs(query(collection(db, `listings`), limit(10), orderBy("id", "asc")))
        .then((snapshot) => {
            snapshot.forEach((item) => {
                console.log(item.data())
            })
        })
        

    }, []);
    return (
        <div>ExmplePage</div>
    )
}

export default ExmplePage