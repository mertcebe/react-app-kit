import React from 'react'
import { useNavigate } from 'react-router'

const Back = ({top, left}) => {
    let navigate = useNavigate();
  return (
    <div style={{position: "absolute", top: top, left: left}}>
        <button className='btn' onClick={()=>{
            navigate(-1);
        }}><i className="fa-solid fa-arrow-left"></i></button>
    </div>
  )
}

export default Back