import { get, ref } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import database, { auth } from '../firebase/myFirebaseConfig';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import Listings from './Listings';

const HomePage = () => {
    let [listings, setListings] = useState();
    let [listingsForOffer, setListingsForOffer] = useState();
    useEffect(() => {
        const getListings = async () => {
            let myListings = [];
            get(ref(database, `listings`))
                .then((snapshot) => {
                    snapshot.forEach((item) => {
                        if (myListings.length === 5) {
                            console.log(myListings)
                            setListings(myListings);
                            return;
                        }
                        myListings.push({
                            ...item.val(),
                            id: item.key
                        });
                    })
                })
        }
        const getListingsForOffer = async () => {
            let myListings = [];
            let myListingsForOffer = [];
            get(ref(database, `listings`))
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
                    for (let i = 0; i < 4; i++) {
                        for (let item of myListings) {
                            if (item.dateAdded === dates[i]) {
                                myListingsForOffer.push(item);
                            }
                        }
                    }
                    setListingsForOffer(myListingsForOffer);
                })
        }
        getListingsForOffer();
        getListings();
    }, []);
    if (!listings || !listingsForOffer) {
        return (
            <Loading />
        )
    }
    console.log(listingsForOffer)
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                navigation
            >
                {listings.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <NavLink to={`/categories/${item.sellOrRent}/${item.id}`}>
                                <div className='w-100 overflow-hidden' style={{ height: "300px", background: `url(${item.img[0].src}) center no-repeat`, backgroundSize: "cover" }}>
                                    <small className='shadow-sm' style={{ color: "#fff", background: "#4e89cd", padding: "2px 12px", borderBottomRightRadius: "10px", position: "absolute", top: "5px", left: "5px" }}>{item.name}</small>
                                    <small className='shadow-sm' style={{ color: "#fff", background: "#d24747", padding: "0 12px", borderTopRightRadius: "10px", position: "absolute", bottom: "5px", left: "5px" }}>{item.regularPrice}{item.sellOrRent == "sell" ? "$" : "$/month"}</small>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <div className='container'>
                {/* Recent Offers */}
                <div className='my-5'>
                    <div style={{marginLeft: "110px"}}>
                        <h5 className='m-0'>Recent Offers</h5>
                        <NavLink to={`/categories/rent`} style={{ fontSize: "12px" }}>Show more offers</NavLink>
                    </div>
                    <Listings listings={listingsForOffer} />
                </div>
            </div>
        </div>
    )
}

export default HomePage