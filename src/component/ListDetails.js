import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';
import { get, ref } from 'firebase/database';
import database, { auth } from '../firebase/myFirebaseConfig'
import Loading from './Loading';
import Back from './Back';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ListDetails = () => {
    let { type, id } = useParams();
    let [list, setList] = useState();
    let [msgControl, setMsgControl] = useState(false);
    let [msg, setMsg] = useState("");
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    useEffect(() => {
        const getList = async () => {
            await get(ref(database, `listings/${id}`))
                .then((snapshot) => {
                    console.log(snapshot.val());
                    setList(snapshot.val());
                })
        }
        getList();
    }, []);

    const contactFunc = async () => {
        setMsgControl(true);
        await get(ref(database, `users/${list.uid}`))
            .then((snapshot) => {
                console.log(snapshot.val());
                setName(snapshot.val().name);
                setEmail(snapshot.val().email);
            })
    }

    const sendMessageFunc = () => {
        if (msg) {
            setMsgControl(false);
            console.log(msg)
            setMsg("");
            toast.success("Successfully sent message to landlord!")
        }
        else {
            toast.info("Enter least one word!");
        }
    }

    if (!list && !name) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                navigation
                pagination={{ clickable: true }}
            >
                {list.img.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <div className='w-100 overflow-hidden' style={{ height: "500px", background: `url(${item.src}) center no-repeat`, backgroundSize: "contain" }}>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="context container d-flex justify-content-evenly align-items my-3 p-4 shadow" style={{ flexWrap: "wrap" }}>
                <div className="text w-50 p-4" id='text'>
                    <h4 className='' style={{ color: "darkblue" }}>{list.name} - {list.sellOrRent === "sell" ? `${list.regularPrice}$` : `${list.regularPrice} $/month`}</h4>
                    <b style={{ fontSize: "14px" }}><i className="fa-solid fa-location-dot text-success"></i> {list.openAddress}</b>
                    <div className='d-flex align-items my-2'>
                        <button className='btn btn-sm btn-danger px-5' style={{ marginRight: "10px" }}>For {list.sellOrRent === "sell" ? "Sell" : "Rent"}</button>
                        {list.offer == "yes" ? <button className='btn btn-sm btn-success px-5'>${list.regularPrice - list.discountedPrice} discount</button> : <></>}
                    </div>
                    <small className='d-block my-4'>
                        {list.description}
                    </small>
                    <div className='d-flex align-items my-2'>
                        <b style={{ fontSize: "12px", marginRight: "14px" }}><i className="fa-solid fa-bed"></i> {list.beds}{list.beds > 1 ? ` beds` : ` bed`}</b>
                        <b style={{ fontSize: "12px", marginRight: "14px" }}><i className="fa-solid fa-bath"></i> {list.baths}{list.baths > 1 ? ` baths` : ` bath`}</b>
                        {
                            list.parkingSpot == "yes" ?
                                <b style={{ fontSize: "12px", marginRight: "14px" }}><i className="fa-solid fa-square-parking"></i> Parking Spot</b>
                                :
                                <></>
                        }
                        {
                            list.furnished == "yes" ?
                                <b style={{ fontSize: "12px" }}><i className="fa-solid fa-chair"></i> Furnished</b>
                                :
                                <></>
                        }
                    </div>
                    {
                        auth.currentUser.uid === list.uid ?
                            <>
                            </>
                            :
                            <>
                                {
                                    msgControl ?
                                        <div>
                                            <small className='text-muted'>Contact {name} for {list.name}!</small>
                                            <div className='d-flex align-items-start'>
                                                <form className='form-group w-100'>
                                                    <textarea className='form-control' id="" value={msg} style={{ width: "100%", height: "100px", maxHeight: "200px" }} onChange={(e) => {
                                                        setMsg(e.target.value);
                                                    }} placeholder='Message'></textarea>
                                                </form>
                                                <button className='btn btn-sm border-0' onClick={() => {
                                                    setMsgControl(false);
                                                }}>x</button>
                                            </div>
                                            {
                                                msg ?
                                                    <a href={`mailto:${email}?Subject=${list.name}&body=${msg}`}>
                                                        <button className='btn btn-sm btn-primary my-2' onClick={sendMessageFunc}>Send Message</button>
                                                    </a>
                                                    :
                                                    <button className='btn btn-sm btn-primary my-2' disabled onClick={sendMessageFunc}>Send Message</button>
                                            }
                                        </div>
                                        :
                                        <button className='btn btn-sm btn-primary my-2' onClick={contactFunc}>Contact Landlord</button>
                                }
                            </>
                    }


                    <div className='d-flex justify-content-between align-items'>
                        <NavLink to={`/profile`} className='btn btn-sm btn-light mt-2 shadow-sm'>Go to Profile</NavLink>
                        <button className='btn btn-sm border-0' onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                                .then(() => {
                                    toast.success("Successfully link copied")
                                })
                        }}>
                            <i className="fa-solid fa-share"></i>
                        </button>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        width="600"
                        height="400"
                        frameBorder="0"
                        src={`//maps.google.com/maps?q=${list.location.lat},${list.location.lng}&z=15&output=embed`}></iframe>
                </div>
            </div>
        </div>
    )
}

export default ListDetails