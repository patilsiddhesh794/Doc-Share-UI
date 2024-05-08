import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Header = () => {
    const { auth, setAuth } = useAuth();

        //Handle Logout
        const handleLogout = ()=>{
            setAuth({
                user: "",
                token: ""
            })
            localStorage.removeItem("auth")
        }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">Share-Doc</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/shared-file">Shared Files</NavLink>
                            </li>
                            {!auth?.user ? (<>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="/register">Register</NavLink>
                                </li>
                            </>) : (<>
                                <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/my-drive">My Drive</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" onClick={handleLogout} to='/login'>Logout</NavLink></li>
                                    </ul>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
