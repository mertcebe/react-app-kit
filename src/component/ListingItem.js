import React from 'react'
import { NavLink } from 'react-router-dom'

const ListingItem = ({ item }) => {
    return (
        <div className="card shadow border-0" id='card' style={{ width: "16rem", margin: "10px", overflow: "hidden" }}>
            <img src={item.img[1].src} id='cardImg' className="card-img-top" style={{ width: "16rem", height: "10rem" }} alt="..." />
            <div className="card-body">
                <small className='d-block text-muted'><i className="fa-solid fa-location-dot text-success"></i> {item.openAddress}</small>
                <h5 className="card-title">{item.name}</h5>
                <b className="d-block card-text" style={{ color: "darkcyan" }}>{item.regularPrice}</b>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <small style={{ marginRight: "14px" }}>{item.beds} beds</small>
                        <small>{item.baths} baths</small>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <NavLink to='edit'><i class="fa-solid fa-pen text-dark"></i></NavLink>
                        <button className='btn btn-sm text-danger border-0'><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingItem