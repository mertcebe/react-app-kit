import React from 'react'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment';
import { ref, remove } from 'firebase/database';
import database, { auth } from '../firebase/myFirebaseConfig'
import { toast } from 'react-toastify';


const ListingItem = ({ item }) => {
    const deleteList = () => {
        let result = window.confirm("Are you sure? You want to delete list!");
        if (result == true) {
            remove(ref(database, `users/${auth.currentUser.uid}/listings/${item.id}`))
                .then(() => {
                    toast.success("Successfully deleted!");
                })
        }
    }
    return (
        <div className="card shadow border-0" id='card' style={{ position: "relative", width: "16rem", margin: "10px", overflow: "hidden" }}>
            <span style={{ fontSize: "12px", position: "absolute", top: "10px", left: "10px", zIndex: "100", background: "lightblue", borderRadius: "10px", padding: "0px 10px", opacity: "0.8" }}>{
                <Moment fromNow>{item.dateAdded}</Moment>
            }</span>
            <img src={item.img[0].src} id='cardImg' className="card-img-top" style={{ width: "16rem", height: "10rem" }} alt="..." />
            <div className="card-body">
                <small className='d-block text-muted'><i className="fa-solid fa-location-dot text-success"></i> {item.openAddress}</small>
                <h5 className="card-title">{item.name}</h5>
                <b className="d-block card-text" style={{ color: "darkcyan" }}>{item.regularPrice}</b>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <small style={{ marginRight: "14px" }}>{item.beds} {Number(item.beds) > 1 ? "beds" : "bed"}</small>
                        <small>{item.baths} {Number(item.baths) > 1 ? "baths" : "bath"}</small>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <NavLink to={`edit-listing/${item.id}`}><i className="fa-solid fa-pen text-dark"></i></NavLink>
                        <button className='btn btn-sm text-danger border-0' onClick={deleteList}><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingItem