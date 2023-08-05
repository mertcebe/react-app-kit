import React from 'react'
import '../style/style.scss';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../component/HomePage'
import OffersPage from '../component/OffersPage';
import SignInPage from '../component/SignInPage';
import ProfilePage from '../component/ProfilePage';
import PrivateRoute from '../component/PrivateRoute';
import useAuthStatus from '../hooks/useAuthStatus';
import PublicRoute from '../component/PublicRoute';
import Loading from '../component/Loading';
import CreatePage from '../component/CreatePage';
import EditListing from '../component/EditListing';
import { ToastContainer } from 'react-toastify';
import ListDetails from '../component/ListDetails';


const Navbar = () => {
    let { isAuthorized } = useAuthStatus();
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-5">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto d-flex justify-content-between w-100 align-items-center">
                    <NavLink className="navbar-brand" to="/"><span className='text-danger'>real</span>tor.com</NavLink>
                    <li className="nav-item active d-flex justify-content-between align-items-center">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/offers">Offers</NavLink>
                        {isAuthorized ? <NavLink className="nav-link" to="/profile">Profile</NavLink> : <NavLink className="nav-link" to="/sign-in">Sign in</NavLink>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

//? Bunu location olarak kullan!!
// const Part = () => {
//     let location = useLocation();
//     return (
//         <div>{location.pathname}</div>
//     )
// }

const AppRouter = () => {
    let { isAuthorized, loading } = useAuthStatus();
    return (
        <>
            {
                loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <BrowserRouter>
                            <Navbar />
                            <Routes>
                                <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
                                    <Route path='/' element={<HomePage />} />
                                    <Route path='/offers' element={<OffersPage />} />
                                    <Route path='/profile'>
                                        <Route index element={<ProfilePage />} />
                                        <Route path='create-listing' element={<CreatePage />} />
                                        <Route path='edit-listing/:id' element={<EditListing />} />
                                        <Route path='categories/:type/:id' element={<ListDetails />} />
                                    </Route>
                                </Route>

                                <Route element={<PublicRoute isAuthorized={isAuthorized} />} >
                                    <Route path='/sign-in' element={<SignInPage signIn={true} />} />
                                    <Route path='/register' element={<SignInPage register={true} />} />
                                    <Route path='/forgot-password' element={<SignInPage forgotPassword={true} />} />
                                </Route>
                            </Routes>
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
                        </BrowserRouter>
                    </>
            }
        </>
    )
}

export default AppRouter