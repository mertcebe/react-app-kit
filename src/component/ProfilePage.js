import React, { useEffect, useState } from 'react'
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/myFirebaseConfig'
import { toast, ToastContainer } from 'react-toastify';
import { ref, set } from 'firebase/database';
import database from '../firebase/myFirebaseConfig'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  let user = auth.currentUser;
  let [name, setName] = useState(user ? user.displayName : "");
  let [disabled, setDisabled] = useState(true);
  let [changeDetails, setChangeDetails] = useState(false);

  let navigate = useNavigate();

  const editFunc = () => {
    setChangeDetails((prevState) => !prevState);

    if (changeDetails === false) {
      document.getElementById("nameInput").style.backgroundColor = "#ff4949";
      document.getElementById("nameInput").style.color = "#fff";
      setDisabled(false);
    }
    else {
      document.getElementById("nameInput").style.backgroundColor = "white";
      document.getElementById("nameInput").style.color = "#000";
      setDisabled(true);
      updateProfile(user, {
        displayName: name
      });
      set(ref(database, `users/${user.uid}`), {
        email: user.email,
        name: name
      });
      toast.success("Successfully editted");
    }

  }

  const signOutFunc = () => {
    signOut(auth).then(() => {
      navigate("/sign-in");
    })
  }

  return (
    <div>
      <div className="profilePart d-flex justify-content-between align-items-center" style={{ flexDirection: "column" }}>
        <h4 className='my-4'>My Profile</h4>
        <form style={{ width: "500px" }}>
          <div className="form-group mb-3">
            <input type="text" value={name} onChange={(e) => {
              setName(e.target.value);
            }} className="form-control" id='nameInput' disabled={disabled} placeholder="Fullname" />
          </div>
          <div className="form-group mb-3">
            <input type="email" value={user.email} className="form-control" disabled placeholder="Email" />
          </div>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <small id='smallEl' className='d-block'>Would you like to change your name? <button type='button' onClick={editFunc} id='editBtn' className='text-danger bg-light border-0'>{changeDetails ? "Apply changes" : "Edit"}</button></small>
            <button type='button' onClick={signOutFunc} className='bg-light border-0'>Sign out</button>
          </div>
          <Link to='create-listing' className="btn btn-primary w-100">Sell or Rent Your Home</Link>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  )
}

export default ProfilePage