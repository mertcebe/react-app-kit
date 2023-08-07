import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/myFirebaseConfig';
import Loading from './Loading';
import { NavLink, useParams } from 'react-router-dom';
import Listings from './Listings';
import Back from './Back';

const CategoriesList = () => {
    let { type } = useParams();
    let [listings, setListings] = useState();
    useEffect(() => {
        const getListings = async () => {
            let myListingsForRent = [];
            let myListingsForSell = [];
            await get(ref(database, `listings`))
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    if(item.val().sellOrRent === "rent"){
                        myListingsForRent.push({
                            ...item.val(),
                            id: item.key
                        });
                    }
                    else if(item.val().sellOrRent === "sell"){
                        myListingsForSell.push({
                            ...item.val(),
                            id: item.key
                        });
                    }
                });
                if(type === "rent"){
                    setListings(myListingsForRent);
                }
                else if(type === "sell"){
                    setListings(myListingsForSell);
                }
            })

        }
        getListings();
    }, []);
    if (!listings) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Back top={"100px"} left={"100px"} />
            <div className='container'>
                {/* Recent Offers */}
                <div className='my-5'>
                    <div style={{ marginLeft: "110px" }}>
                        <h5 className='m-0'>Places for {type}</h5>
                    </div>
                    <Listings listings={listings} />
                </div>
            </div>
        </div>
    )
}

export default CategoriesList