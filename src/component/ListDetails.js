import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { get, ref } from 'firebase/database';
import database, { auth } from '../firebase/myFirebaseConfig'
import Loading from './Loading';
import Back from './Back';

const ListDetails = () => {
    let { type, id } = useParams();
    let [list, setList] = useState();
    useEffect(() => {
        const getList = async () => {
            await get(ref(database, `users/${auth.currentUser.uid}/listings/${id}`))
                .then((snapshot) => {
                    console.log(snapshot.val());
                    setList(snapshot.val());
                })
        }
        getList();
    }, []);
    if (!list) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Back top={"60px"} left={"80px"}/>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
            >
                {list.img.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <div className='w-100 overflow-hidden' style={{ height: "300px", background: `url(${item.src}) center no-repeat` }}>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="context container d-flex justify-content-evenly align-items my-3 p-4" style={{ background: "#efefef" }}>
                <div className="text w-50 p-4">
                    <h4 className='' style={{ color: "darkblue" }}>{list.name} - {list.sellOrRent === "sell" ? `${list.regularPrice}$` : `${list.regularPrice} $/month`}</h4>
                    <b style={{fontSize: "14px"}}><i class="fa-solid fa-location-dot text-success"></i> {list.openAddress}</b>
                    <div className='d-flex align-items my-2'>
                        <button className='btn btn-sm btn-danger px-5' style={{ marginRight: "10px" }}>For {list.sellOrRent === "sell" ? "Sell" : "Rent"}</button>
                        <button className='btn btn-sm btn-success px-5'>${list.regularPrice - list.discountedPrice} discount</button>
                    </div>
                    <small className='d-block my-4'>
                        {list.description}
                    </small>
                    <div className='d-flex align-items my-2'>
                        <b style={{ fontSize: "12px", marginRight: "14px" }}><i class="fa-solid fa-bed"></i> {list.beds}{list.beds > 1 ? ` beds` : ` bed`}</b>
                        <b style={{ fontSize: "12px", marginRight: "14px" }}><i class="fa-solid fa-bath"></i> {list.baths}{list.baths > 1 ? ` baths` : ` bath`}</b>
                        {
                            list.parkingSpot == "yes" ?
                                <b style={{ fontSize: "12px", marginRight: "14px" }}><i class="fa-solid fa-square-parking"></i> Parking Spot</b>
                                :
                                <></>
                        }
                        {
                            list.furnished == "yes" ?
                                <b style={{ fontSize: "12px" }}><i class="fa-solid fa-chair"></i> Furnished</b>
                                :
                                <></>
                        }
                    </div>
                </div>
                <div className="map">
                    <iframe 
                    width="600"
                    height="400"
                    frameborder="0"
                    src={`//maps.google.com/maps?q=${list.location.lat},${list.location.lng}&z=15&output=embed`}></iframe>
                </div>
            </div>
        </div>
    )
}

export default ListDetails