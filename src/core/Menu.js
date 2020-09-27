import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/bunny.svg'
import { FaUser, FaCartArrowDown, FaHome } from 'react-icons/fa';

const Menu = () => {

    useEffect(() => {
        const hamburger = document.querySelector('.hamburger');
        const navlinks = document.querySelector('.navlink')

        hamburger.addEventListener("click", () => {
            navlinks.classList.toggle("open");
        })
    }, [])

    const changeScreen = () => {

        var element = document.querySelector(".linkk1");
        element.classList.add("actiii");
        var element1 = document.querySelector(".linkk2");
        element1.classList.remove("actiii");
        var element2 = document.querySelector(".linkk3");
        element2.classList.remove("actiii");
        var element3 = document.querySelector(".linkk4");
        element3.classList.remove("actiii");
    }
    const changeScreen1 = () => {

        var element = document.querySelector(".linkk1");
        element.classList.remove("actiii");
        var element1 = document.querySelector(".linkk2");
        element1.classList.add("actiii");
        var element2 = document.querySelector(".linkk3");
        element2.classList.remove("actiii");
        var element3 = document.querySelector(".linkk4");
        element3.classList.remove("actiii");
    }
    const changeScreen2 = () => {

        var element = document.querySelector(".linkk1");
        element.classList.remove("actiii");
        var element1 = document.querySelector(".linkk2");
        element1.classList.remove("actiii");
        var element2 = document.querySelector(".linkk3");
        element2.classList.add("actiii");
        var element3 = document.querySelector(".linkk4");
        element3.classList.remove("actiii");
    }
    const changeScreen3 = () => {

        var element = document.querySelector(".linkk1");
        element.classList.remove("actiii");
        var element1 = document.querySelector(".linkk2");
        element1.classList.remove("actiii");
        var element2 = document.querySelector(".linkk3");
        element2.classList.remove("actiii");
        var element3 = document.querySelector(".linkk4");
        element3.classList.add("actiii");
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
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} onPointerOver={changeScreen} className="link linkk1 actiii" to='/products/unique/gifts'>UNIQUE GIFTS</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} onPointerOver={changeScreen1} className="link linkk2" to="/products/diykit">DIY KITS</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} onPointerOver={changeScreen2} className="link linkk3" to="/products/experience">EXPERIENCES</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} onPointerOver={changeScreen3} className="link linkk4" to="/products/special/services">CELE BASH</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Menu);