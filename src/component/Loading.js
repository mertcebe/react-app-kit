import React from 'react'
import loadingGif2 from '../logo/loadingGif2.gif'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: "90vh"}}>
        <img src={loadingGif2} alt="" style={{width: "300px"}}/>
    </div>
  )
}

export default Loading