import React from 'react'
import { Outlet } from 'react-router'

const SignInPage = () => {
    return (
        <div>
            <h5 className='text-center'>Sign In</h5>
            <Outlet />
        </div>
    )
}

export default SignInPage