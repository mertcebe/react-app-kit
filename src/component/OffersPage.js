import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/myFirebaseConfig';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import Listings from './Listings';
import Back from './Back';

const OffersPage = () => {
  let [maxLength, setMaxLength] = useState(0);
  let [listingsForMoreOffer, setListingsForMoreOffer] = useState();
  const getListingsForMoreOffer = async (val = 8) => {
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
        dates = dates.sort().reverse();

        for (let i = 0; i < dates.length; i++) {
          for (let item of myListings) {
            if (item.dateAdded === dates[i]) {
              myListingsForOffer.push(item);
            }
          }
        }
        setMaxLength(myListingsForOffer.length);
        setListingsForMoreOffer(myListingsForOffer.slice(0, val > 12?12:val));
      })
  }
  useEffect(() => {
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
          {
            listingsForMoreOffer.length === maxLength?
            <></>
            :
            <div className='text-center my-4'>
            <button className='btn btn-sm btn-outline-success' onClick={()=>{
              getListingsForMoreOffer(listingsForMoreOffer.length + 8)
            }}>Load More</button>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OffersPage