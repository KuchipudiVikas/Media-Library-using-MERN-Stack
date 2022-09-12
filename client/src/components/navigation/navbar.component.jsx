import { Outlet, Link } from "react-router-dom";
import navCategories from "./navcategories"

import { Fragment } from 'react';

const Footer = () => {
    return (
        <h1>this is footer partial</h1>
    )
}

const NavBar = () => {
    return (
        <Fragment>
            <div>
                {
                    navCategories.map((navlink) => {
                        return (
                            <span>
                                <Link to={navlink.link}> {navlink.name} </Link>
                            </span>
                        )
                    })
                }
                <Outlet />


            </div>
        </Fragment>
    )
}

export default NavBar;