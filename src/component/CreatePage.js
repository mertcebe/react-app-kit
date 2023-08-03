import React, { useEffect, useReducer } from 'react'
import { styled } from 'styled-components'
import Back from './Back'
import { reducer, setValues } from './CreateAction'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getStorage, ref as storeRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from '../firebase/myFirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { get, push, ref, set } from 'firebase/database';
import database from '../firebase/myFirebaseConfig'
import { useNavigate } from 'react-router';


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



const CreatePage = () => {
  let [state, dispatch] = useReducer(reducer, {
    sellOrRent: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parkingSpot: "no",
    furnished: "no",
    address: "",
    location: {},
    description: "",
    offer: "no",
    regularPrice: 0,
    discountedPrice: 0,
    img: []
  });

  useEffect(() => {
    
  }, [auth.currentUser.uid]);

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
          state.location = location;
          toast.success("Successfully have found that location and created listing");
          submitImagesToStorage(state.img).then(async (data) => {
            state.img = await data;
          }).then(() => {
            setTimeout(() => {
              push(ref(database, `users/${auth.currentUser.uid}/listings`), state).then((snapshot) => {
                navigate(`/categories/${state.sellOrRent}/${snapshot.key}`);
              })
              console.log("images are loaded");
            }, 4000);
          })


        }
        else {
          toast.error("Have not found that location, try again!");
        }
      })
  }


  const submitImagesToStorage = async (files) => {
    let result = new Promise((resolve, reject) => {
      const storage = getStorage();

      let newImages = [];
      files.map(async (file) => {
        const { self, name, type } = file;
        const metadata = {
          contentType: `${type}`
        };
        let fileName = `${auth.currentUser.uid}-${name}-${uuidv4()}`;
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
    return result;
  }


  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <Back top={"70px"} left={"50px"} />
      <form onSubmit={submitFunc}>
        <h4 className='text-center my-3'>Create Listing</h4>


        {/* *****Sell / Rent***** */}
        <div className='mb-3'>
          <small className='d-block'>Sell / Rent</small>
          <input type="radio" name="radio1" value="sell" onChange={(e) => {
            setValues(dispatch, "sellOrRent", e.target.value);
          }} id="radio1Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio1Input' id='myLabel'>Sell</MyOption>

          <input type="radio" name="radio1" defaultChecked value="rent" onChange={(e) => {
            setValues(dispatch, "sellOrRent", e.target.value);
          }} id="radio1Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio1Input2' id='myLabel'>Rent</MyOption>
        </div>

        <small className='d-block'>Name</small>
        <input type="text" className='w-100 p-1' onChange={(e) => {
          setValues(dispatch, "name", e.target.value);
        }} placeholder='Name' />

        <div className='d-flex align-items-center my-3'>
          <div>
            <small className='d-block'>Beds</small>
            <input type="number" defaultValue={1} onChange={(e) => {
              setValues(dispatch, "beds", e.target.value);
            }} style={{ width: "50px" }} />
          </div>
          <div>
            <small className='d-block'>Baths</small>
            <input type="number" defaultValue={1} onChange={(e) => {
              setValues(dispatch, "baths", e.target.value);
            }} style={{ width: "50px" }} />
          </div>
        </div>


        {/* *****Parking spot***** */}
        <div className='mb-3'>
          <small className='d-block'>Parking spot</small>
          <input type="radio" name="radio2" value="yes" onChange={(e) => {
            setValues(dispatch, "parkingSpot", e.target.value);
          }} id="radio2Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio2Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio2" defaultChecked value="no" onChange={(e) => {
            setValues(dispatch, "parkingSpot", e.target.value);
          }} id="radio2Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio2Input2' id='myLabel'>No</MyOption>
        </div>


        {/* *****Furnished***** */}
        <div className='mb-3'>
          <small className='d-block'>Furnished</small>
          <input type="radio" name="radio3" value="yes" onChange={(e) => {
            setValues(dispatch, "furnished", e.target.value);
          }} id="radio3Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio3Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio3" defaultChecked value="no" onChange={(e) => {
            setValues(dispatch, "furnished", e.target.value);
          }} id="radio3Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio3Input2' id='myLabel'>No</MyOption>
        </div>

        <div className='mb-3'>
          <small className='d-block'>Address</small>
          <textarea cols="40" required onChange={(e) => {
            setValues(dispatch, "address", e.target.value);
          }} rows="3"></textarea>
        </div>

        <div className="mb-3">
          <small className='d-block'>Description</small>
          <textarea cols="40" required onChange={(e) => {
            setValues(dispatch, "description", e.target.value);
          }} rows="3"></textarea>
        </div>



        {/* *****Offer***** */}
        <div className='mb-3'>
          <small className='d-block'>Offer</small>
          <input type="radio" name="radio4" value="yes" onChange={(e) => {
            setValues(dispatch, "offer", e.target.value);
          }} id="radio4Input" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio4Input' id='myLabel'>Yes</MyOption>
          <input type="radio" name="radio4" defaultChecked value="no" onChange={(e) => {
            setValues(dispatch, "offer", e.target.value);
          }} id="radio4Input2" className='radioInput' style={{ display: "none" }} />
          <MyOption htmlFor='radio4Input2' id='myLabel'>No</MyOption>
        </div>


        <div>
          <small className='d-block'>Regular Price</small>
          <div className='mb-3 d-flex align-items-center'>
            <div>
              <input type="number" onChange={(e) => {
                setValues(dispatch, "regularPrice", e.target.value);
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
                  <input type="number" onChange={(e) => {
                    setValues(dispatch, "discountedPrice", e.target.value);
                  }} placeholder='0' max={Number(state.regularPrice) - 1} min={10} required style={{ width: "100px" }} />
                </div>
                <p style={{ alignSelf: "end", opacity: "0.7", marginLeft: "10px", position: "relative", top: "8px" }}>{state.sellOrRent === "rent" ? "$/month" : "$"}</p>
              </div>
            </div>
            :
            <>
              {delete state.discountedPrice}
            </>
        }

        <div className='mb-3'>
          <small className='d-block'>Images</small>
          <input type="file" id='imgInput' required multiple accept='.png, .jpeg, .jpg' onChange={(e) => {
            // setValues(dispatch, "img", e.target.value);
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
        </div>

        <button type='submit' className='btn btn-success btn-sm w-100 my-4'>Create Listing</button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default CreatePage