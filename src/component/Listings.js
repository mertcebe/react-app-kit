import React from 'react'
import ListingItem from './ListingItem'

const Listings = ({listings}) => {
    return (
        <>
            <h5 style={{ marginTop: "50px" }}>My Listings</h5>
            <div className='d-flex justify-content-center align-items-center' style={{ flexWrap: "wrap" }}>
                {
                    listings.map((item, index) => {
                        return <ListingItem item={item} key={index} />
                    })
                }
            </div>
        </>
    )
}

export default Listings