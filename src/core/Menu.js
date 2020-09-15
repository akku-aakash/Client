import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/logo.svg'

const Menu = () => {

    return (
        <Fragment>
            <div className="home2">
                <div className="home22">
                    <Link to="/"><img src={Bunny} alt="" /></Link>
                </div>
                <div className="home4">
                    <Link to="/cart"><i className="fa fa-shopping-cart"></i> <sup><small>{itemTotal()}</small></sup></Link>
                    <Link to="/user/dashboard"><i className="fa fa-user"></i></Link>
                    <Link to="/shop"><i className="fa fa-search"></i></Link>
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
                            }} className="link" style={{ backgroundColor: "rgb(247, 196, 30)" }} to='/products/unique/gifts'>UNIQUE GIFTS</Link>
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
                            }} className="link" to="/products/special/services">SPECIAL SERVICES</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Menu);