import React from 'react'
import '../style/style.scss';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../component/HomePage'
import OffersPage from '../component/OffersPage';
import SignInPage from '../component/SignInPage';

const Navbar = () => {
    let isAuthorized = false
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-5">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto d-flex justify-content-between w-100 align-items-center">
                    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                    <li className="nav-item active d-flex justify-content-between align-items-center">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/offers">Offers</NavLink>
                        {isAuthorized ? <NavLink className="nav-link" to="/profile">Profile</NavLink>:<NavLink className="nav-link" to="/sign-in">Sign in</NavLink>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

//? Bunu location olarak kullan!!
// const Part = () => {
//     let location = useLocation()
//     return (
//         <div>{location.pathname}</div>
//     )
// }

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/offers' element={<OffersPage />} />
                    <Route path='/sign-in' element={<SignInPage signIn={true}/>} />
                    <Route path='/register' element={<SignInPage register={true}/>} />
                    <Route path='/forgot-password' element={<SignInPage forgotPassword={true}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter