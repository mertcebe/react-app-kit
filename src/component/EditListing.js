import React, { useEffect, useState } from 'react'
import CreatePage from './CreatePage'
import { get, ref } from 'firebase/database';
import { auth } from '../firebase/myFirebaseConfig';
import database from '../firebase/myFirebaseConfig'
import { useNavigate, useParams } from 'react-router';
import Loading from './Loading';
import { toast } from 'react-toastify';

const EditListing = () => {
    let { id } = useParams();
    let [list, setList] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        const func = async () => {
            if (id) {
                await get(ref(database, `users/${auth.currentUser.uid}/listings/${id}`))
                    .then((snapshot) => {
                        if (snapshot.val()) {
                            setList({
                                ...snapshot.val(),
                                id: id
                            })
                        }
                        else {
                            toast.error("You can not edit this listing!");
                            navigate("/");
                        }
                    })
            }
        }
        func();
    }, []);
    if (!list) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <CreatePage edit={true} list={list} />
        </>
    )
}

export default EditListing