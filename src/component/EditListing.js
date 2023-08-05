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
    let [loading, setLoading] = useState(false);
    let [list, setList] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        const func = async () => {
            if (id) {
                setLoading(true);
                await get(ref(database, `users/${auth.currentUser.uid}/listings/${id}`))
                    .then((snapshot) => {
                        if (snapshot.val()) {
                            let list = {
                                ...snapshot.val(),
                                id: id
                            }
                            setLoading(false)
                            // console.log(list)
                            setList(list)
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