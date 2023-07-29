import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const PersonalDetails = () => {
  let [job, setJob] = useState("");
  let [city, setCity] = useState("");
  let [bio, setBio] = useState("");
  let dispatch = useDispatch();
  const submit = () => {
    dispatch({
      type: "ADD_PERSONAL",
      payload: {
        job: job,
        city: city,
        bio: bio
      }
    })
  }
  let user = useSelector((state) => {
    return state.signIn
  })

  useEffect(() => {
    setJob(user.job);
    setCity(user.city);
    setBio(user.bio);
  }, []);

  return (
    <div className='container' style={{ width: "300px" }}>
      <h4 className='bg-primary text-light'>Enter Personal Details</h4>
      <form className=''>
        <div className="form-group mb-2">
          <label htmlFor="exampleInputJob1">Job</label>
          <input type="text" value={job} onChange={(e) => {
            setJob(e.target.value);
          }} className="form-control" id="exampleInputJob1" placeholder="Enter job" />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="exampleInputCity1">City</label>
          <input type="text" value={city} onChange={(e) => {
            setCity(e.target.value);
          }} className="form-control" id="exampleInputCity1" placeholder="Enter city" />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="exampleInputBio1">Bio</label>
          <input type="text" value={bio} onChange={(e) => {
            setBio(e.target.value);
          }} className="form-control" id="exampleInputBio1" placeholder="Enter bio" />
        </div>
        <div className="d-flex justify-content-evenly mt-4">
          {job && city && bio ? <NavLink to={`${user.name}`} onClick={submit} className="btn btn-primary">Continue</NavLink> : <NavLink to={`${user.name}`} onClick={submit} className="btn btn-primary disabled">Continue</NavLink> }
          <NavLink to={`/signin`} className="btn btn-primary">Back</NavLink>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails