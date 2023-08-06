import React from 'react'
import ListingItem from './ListingItem'

const Listings = ({listings}) => {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ flexWrap: "wrap" }}>
                {
                    listings.map((item, index) => {
                        return <ListingItem item={item} key={index} myKey={index} />
                    })
                }
            </div>
        </>
    )
}

export default Listings