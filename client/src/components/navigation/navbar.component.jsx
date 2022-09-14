import { Outlet, Link } from "react-router-dom";
import navCategories from "./navcategories"
import './navbar.css'
import { Fragment } from 'react';



const NavBar = () => {
    return (
        <Fragment>
            <div class="one">
                <i class="fa fa-html5" aria-hidden="true"></i>
                <nav class="first">
                    <ul class="nav_links">

                        <li><Link to={'/'}>Home</Link>
                        </li>
                        <li><Link to={'/'}>Movies</Link>
                        </li>
                        <li><Link to={'/new'}>New</Link>
                        </li>

                    </ul>
                </nav>
            </div>



            {/* <div>
                {
                    navCategories.map((navlink) => {
                        return (
                            <span>
                                <Link to={navlink.link}> {navlink.name} </Link>
                            </span>
                        )
                    })
                }
            </div> */}
            <Outlet />
        </Fragment>
    )
}

export default NavBar;