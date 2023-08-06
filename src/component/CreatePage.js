import React, { useEffect, useReducer, useState } from 'react'
import { styled } from 'styled-components'
import Back from './Back'
import { reducer, setValues } from './CreateAction'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getStorage, ref as storeRef, uploadBytesResumable, getDownloadURL, getBlob } from "firebase/storage";
import { auth } from '../firebase/myFirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { get, push, ref, set, update } from 'firebase/database';
import database from '../firebase/myFirebaseConfig'
import { json, useNavigate, useParams } from 'react-router';
import Loading from './Loading';


const MyOption = styled.label({
  width: "160px",
  height: "30px",
  background: "#fff",
  boxShadow: "1px 2px 5px #ababab",
  textAlign: "center",
  lineHeight: "30px",
  borderRadius: "5px",
  transition: "all 0.3s ease"
})



const CreatePage = ({ edit, list }) => {
  let [state, dispatch] = useReducer(reducer, {
    sellOrRent: list ? list.sellOrRent : "rent",
    name: list ? list.name : "",
    beds: list ? list.beds : 1,
    baths: list ? list.baths : 1,
    parkingSpot: list ? list.parkingSpot : "no",
    furnished: list ? list.furnished : "no",
    address: list ? list.address : "",
    location: list ? list.location : {},
    description: list ? list.description : "",
    offer: list ? list.offer : "no",
    regularPrice: list ? list.regularPrice : 0,
    discountedPrice: list ? list.discountedPrice : 0,
    img: list ? list.img : [],
    uid: auth.currentUser.uid,
    dateAdded: ""
  });

  let navigate = useNavigate();

  const submitFunc = (e) => {
    e.preventDefault();

    let apiKey = "3eb1eb649f804b20bb73e005acf1c940";

    let location = {};
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${state.address}&key=${apiKey}`)
      .then(async (response) => {
        if (response.data.results.length > 0) {
          console.log(response.data.results[0]);
          location.lat = await response.data.results[0]?.geometry.lat ?? 0;
          location.lng = await response.data.results[0]?.geometry.lng ?? 0;
          state.openAddress = await response.data.results[0].formatted;
          state.location = location;
          state.dateAdded = new Date().getTime();
          toast.success(`Successfully have found that location and ${edit ? `editted` : `created`} listing`);
          submitImagesToStorage(state.img).then(async (data) => {
            state.img = await data;
          }).then(() => {
            setTimeout(() => {
              if (edit) {
                update(ref(database, `users/${auth.currentUser.uid}/listings/${list.id}`), state)
                  .then(() => {
                    update(ref(database, `listings/${list.id}`),state);
                    navigate(`/profile`);
                  })
              }
              else {
                push(ref(database, `users/${auth.currentUser.uid}/listings`), state).then((snapshot) => {
                  set(ref(database, `listings/${snapshot.key}`),state);
                  navigate(`/categories/${state.sellOrRent}/${snapshot.key}`);
                })
              }
            }, 4000);
          })
        }
        else {
          toast.error("Could not found that location, try again!");
        }
      })
  }

  const submitImagesToStorage = async (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      let newImages = [];

      files.map(async (file) => {
        const { self, name, type } = file;
        const metadata = {
          contentType: `${type}`
        };
        let fileName = `${auth.currentUser.uid}-${name}`;
        const storageRef = storeRef(storage, 'images/' + fileName);
        const uploadTask = await uploadBytesResumable(storageRef, self, metadata)
          .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(async (dataUrl) => {
              newImages.push({
                name: name,
                type: type,
                src: dataUrl
              })
              if (files[files.length - 1] === file) {
                toast.success(`Successfully all images uploaded to Firestore`);
                resolve(newImages);
              }
            });
          })
      })
    })
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <Back top={"70px"} left={"50px"} />
      <form onSubmit={submitFunc}>
        <h4 className='text-center my-3'>{edit ? "Edit" : "Create"} Listing</h4>


        {/* *****Sell / Rent***** */}
        <div className='mb-3'>
          <small className='d-block'>Sell / Rent</small>
          <input type="radio" name="radio1" value="sell" defaultChecked={state.sellOrRent === "sell" ? true : false} onChange={(e) => {
            setValues(dispatch, "sellOrRent", e.target.value);
          }} id="radio1Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio1Input' id='myLabel'>Sell</MyOption>

          <input type="radio" name="radio1" defaultChecked={state.sellOrRent === "rent" ? true : false} value="rent" onChange={(e) => {
            setValues(dispatch, "sellOrRent", e.target.value);
          }} id="radio1Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio1Input2' id='myLabel'>Rent</MyOption>
        </div>

        <small className='d-block'>Name</small>
        <input type="text" value={state.name} className='w-100 p-1' onChange={(e) => {
          setValues(dispatch, "name", e.target.value);
        }} placeholder='Name' />

        <div className='d-flex align-items-center my-3'>
          <div>
            <small className='d-block'>Beds</small>
            <input type="number" defaultValue={state.beds} onChange={(e) => {
              setValues(dispatch, "beds", e.target.value);
            }} style={{ width: "50px" }} />
          </div>
          <div>
            <small className='d-block'>Baths</small>
            <input type="number" defaultValue={state.baths} onChange={(e) => {
              setValues(dispatch, "baths", e.target.value);
            }} style={{ width: "50px" }} />
          </div>
        </div>


        {/* *****Parking spot***** */}
        <div className='mb-3'>
          <small className='d-block'>Parking spot</small>
          <input type="radio" name="radio2" defaultChecked={state.parkingSpot === "yes" ? true : false} value="yes" onChange={(e) => {
            setValues(dispatch, "parkingSpot", e.target.value);
          }} id="radio2Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio2Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio2" defaultChecked={state.parkingSpot === "no" ? true : false} value="no" onChange={(e) => {
            setValues(dispatch, "parkingSpot", e.target.value);
          }} id="radio2Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio2Input2' id='myLabel'>No</MyOption>
        </div>


        {/* *****Furnished***** */}
        <div className='mb-3'>
          <small className='d-block'>Furnished</small>
          <input type="radio" name="radio3" defaultChecked={state.furnished === "yes" ? true : false} value="yes" onChange={(e) => {
            setValues(dispatch, "furnished", e.target.value);
          }} id="radio3Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio3Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio3" defaultChecked={state.furnished === "no" ? true : false} value="no" onChange={(e) => {
            setValues(dispatch, "furnished", e.target.value);
          }} id="radio3Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio3Input2' id='myLabel'>No</MyOption>
        </div>

        <div className='mb-3'>
          <small className='d-block'>Address</small>
          <textarea cols="40" required defaultValue={state.address} onChange={(e) => {
            setValues(dispatch, "address", e.target.value);
          }} rows="3"></textarea>
        </div>

        <div className="mb-3">
          <small className='d-block'>Description</small>
          <textarea cols="40" defaultValue={state.description} onChange={(e) => {
            setValues(dispatch, "description", e.target.value);
          }} rows="3"></textarea>
        </div>



        {/* *****Offer***** */}
        <div className='mb-3'>
          <small className='d-block'>Offer</small>
          <input type="radio" name="radio4" defaultChecked={state.offer === "yes" ? true : false} value="yes" onChange={(e) => {
            setValues(dispatch, "offer", e.target.value);
          }} id="radio4Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio4Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio4" defaultChecked={state.offer === "no" ? true : false} value="no" onChange={(e) => {
            setValues(dispatch, "offer", e.target.value);
          }} id="radio4Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio4Input2' id='myLabel'>No</MyOption>
        </div>


        <div>
          <small className='d-block'>Regular Price</small>
          <div className='mb-3 d-flex align-items-center'>
            <div>
              <input type="number" defaultValue={state.regularPrice} onChange={(e) => {
                setValues(dispatch, "regularPrice", `${e.target.value}`);
              }} placeholder='0' max={10000000} min={100} required style={{ width: "100px" }} />
            </div>
            <p style={{ alignSelf: "end", opacity: "0.7", marginLeft: "10px", position: "relative", top: "8px" }}>{state.sellOrRent === "rent" ? "$/month" : "$"}</p>
          </div>
        </div>

        {
          state.offer === "yes" ?
            <div>
              <small className='d-block'>Discounted Price</small>
              <div className='mb-3 d-flex align-items-center'>
                <div>
                  <input type="number" defaultValue={state.discountedPrice} onChange={(e) => {
                    setValues(dispatch, "discountedPrice", `${e.target.value}`);
                  }} placeholder='0' max={Number(state.regularPrice) - 1} min={10} required style={{ width: "100px" }} />
                </div>
                <p style={{ alignSelf: "end", opacity: "0.7", marginLeft: "10px", position: "relative", top: "8px" }}>{state.sellOrRent === "rent" ? "$/month" : "$"}</p>
              </div>
            </div>
            :
            <>
              {state.discountedPrice = null}
            </>
        }

        <div className='mb-3'>
          <small className='d-block'>Images</small>
          <input type="file" id='imgInput' required multiple accept='.png, .jpeg, .jpg' onChange={(e) => {
            let files = [];
            for (let file of e.target.files) {
              files.push({
                self: file,
                name: file.name,
                type: file.type
              });
            }
            setValues(dispatch, "img", files);
          }} />
          {edit ? <small className='d-block' style={{ width: "300px" }}>If you don't click the 'Choose file' button, your files will disappear, so you have to select new files!</small> : <></>}
        </div>

        <button type='submit' className='btn btn-success btn-sm w-100 my-4'>{edit ? "Edit" : "Create"} Listing</button>
      </form>
    </div>
  )
}

export default CreatePage