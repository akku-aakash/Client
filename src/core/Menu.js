import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/bunny.svg'
import {FaUser, FaCartArrowDown, FaSearch} from 'react-icons/fa';

const Menu = () => {

    useEffect(() => {
        const hamburger = document.querySelector('.hamburger');
        const navlinks = document.querySelector('.navlink')

        hamburger.addEventListener("click", () => {
            navlinks.classList.toggle("open");
        })
    },[])

    return (
        <Fragment>
            <div className="home2">
                <div className="home22">
                    <Link to="/"><img src={Bunny} alt="" /></Link>
                </div>
                <div className="home4">
                    <Link to="/cart"><p><FaCartArrowDown/><sup><small>{itemTotal()}</small></sup></p></Link>
                    <Link to="/user/dashboard"><p><FaUser/></p></Link>
                    <Link to="/shop"><p><FaSearch /></p></Link>
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
                            }} className="link" style={{ backgroundColor: "rgb(247, 196, 30)", fontWeight:'bold' }} to='/products/unique/gifts'>UNIQUE GIFTS</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} className="link" to="/products/diykit">DIY KITS</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} className="link" to="/products/experience">EXPERIENCES</Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                const navlinks = document.querySelector('.navlink')
                                navlinks.classList.toggle("open");
                            }} className="link" to="/products/special/services">CELE BASH</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Menu);