import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/bunny.svg'
import { FaUser, FaCartArrowDown, FaHome } from 'react-icons/fa';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { backgroundColor: '#f1bc19' }
    }
    else {
        return { backgroundColor: "transparent" };
    }
}

const Menu = ({history}) => {

    useEffect(() => {
        const hamburger = document.querySelector('.hamburger');
        const navlinks = document.querySelector('.navlink')

        hamburger.addEventListener("click", () => {
            navlinks.classList.toggle("open");
        })
    }, [])

    const changeScreen = () => {

        const navlinks = document.querySelector('.navlink')
        navlinks.classList.toggle("open");
    }
    const changeScreen1 = () => {
        const navlinks = document.querySelector('.navlink')
        navlinks.classList.toggle("open");
    }
    const changeScreen2 = () => {
        const navlinks = document.querySelector('.navlink')
        navlinks.classList.toggle("open");
    }
    const changeScreen3 = () => {
        const navlinks = document.querySelector('.navlink')
        navlinks.classList.toggle("open");
    }

    return (
        <Fragment>
            <div className="home2">
                <div className="home22">
                    <Link to="/"><img src={Bunny} alt="" /></Link>
                </div>
                <div className="home4">
                    <Link to="/"><p><FaHome /></p></Link>
                    <Link to="/cart"><p><FaCartArrowDown /><sup><small>{itemTotal()}</small></sup></p></Link>
                    <Link to="/user/dashboard"><p><FaUser /></p></Link>
                </div>
            </div>
            <div className="home5">
                <div className="nav">
                    <div className="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <ul className="navlink">
                        <li>
                            <Link style={isActive(history, '/products/unique/gifts')} onClick={changeScreen} className="link linkk1 actiii" to='/products/unique/gifts'>UNIQUE GIFTS</Link>
                        </li>
                        <li>
                            <Link style={isActive(history, '/products/diykit')}  onClick={changeScreen1} className="link linkk2" to="/products/diykit">DIY KITS</Link>
                        </li>
                        <li>
                            <Link style={isActive(history, '/products/experience')} onClick={changeScreen2} className="link linkk3" to="/products/experience">EXPERIENCES</Link>
                        </li>
                        <li>
                            <Link style={isActive(history, '/products/special/services')} onClick={changeScreen3} className="link linkk4" to="/products/special/services"> CELE BASH </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Menu);