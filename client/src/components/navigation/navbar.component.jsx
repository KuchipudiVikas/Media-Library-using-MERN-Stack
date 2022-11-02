import { Outlet, Link } from "react-router-dom";
import navCategories from "./navcategories"

import { Fragment } from 'react';




const NavBar = () => {

    return (
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={'/'}>Movie Store</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/search'}>Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/new'}>New</Link>
                        </li>

                    </ul>

                </div>
            </nav>
            <Outlet />
        </div>


    )
}

export default NavBar;