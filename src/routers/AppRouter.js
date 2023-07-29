import React from 'react'
import '../style/style.scss';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from '../component/HomePage'
import SignInPage from '../component/SignInPage';
import UserDetails from '../component/UserDetails';
import PersonalDetails from '../component/PersonalDetails';
import Confirm from '../component/Confirm';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-5">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/signin' element={<SignInPage />}>
                        <Route index element={<UserDetails />} />
                        <Route path='personal' element={<PersonalDetails />} />
                        <Route path='personal/:name' element={<Confirm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter