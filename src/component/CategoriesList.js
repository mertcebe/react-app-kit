import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/myFirebaseConfig';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import Listings from './Listings';
import Back from './Back';

const CategoriesList = () => {
    let [listingsForMoreOffer, setListingsForMoreOffer] = useState();
    useEffect(() => {
        const getListingsForMoreOffer = async () => {
            let myListings = [];
            let myListingsForOffer = [];
            await get(ref(database, `listings`))
                .then((snapshot) => {
                    snapshot.forEach((item) => {
                        myListings.push({
                            ...item.val(),
                            id: item.key
                        });
                    })
                })
                .then(() => {
                    let dates = [];
                    for (let item of myListings) {
                        dates.push(item.dateAdded);
                    }
                    dates = dates.sort();
                    dates = dates.reverse();

                    console.log(dates)
                    for (let i = 0; i < dates.length; i++) {
                        for (let item of myListings) {
                            if (item.dateAdded === dates[i]) {
                                myListingsForOffer.push(item);
                            }
                        }
                    }
                    setListingsForMoreOffer(myListingsForOffer);
                })
        }
        getListingsForMoreOffer();
    }, []);
    if (!listingsForMoreOffer) {
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
                        <h5 className='m-0'>Recent Offers</h5>
                    </div>
                    <Listings listings={listingsForMoreOffer} />
                </div>
            </div>
        </div>
    )
}

export default CategoriesList