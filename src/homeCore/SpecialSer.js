import React from 'react';
import { isAuth } from '../helpers/auth';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/logo.svg'

const SpecialSer = () => {
    return (
        <div>
            <div className="home2">
                <div className="home22">
                    <Link to="/"><img src={Bunny} alt="" /></Link>
                </div>
                <div className="home4">
                    <Link to="/cart"><i className="fa fa-shopping-cart"></i> <sup><small>{itemTotal()}</small></sup></Link>
                    {
                        isAuth() && isAuth().role === 0 && <Link to="/user/dashboard"><i className="fa fa-user"></i></Link>
                    }
                    {
                        isAuth() && isAuth().role === 1 && <Link to="/admin/dashboard"><i className="fa fa-user"></i></Link>
                    }
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
            <div className="home15">
                <div className="home16">
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={4}>
                                <div className="home17">
                                    <h3>About Us</h3>
                                    <p>Bunny Bash sells online personaized props and gifts
                                    birthday and baby sower decoration at home, and
            birthday surprise home delivery at Bangalore, and Mumbai</p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={2}>
                                <div className="home18">
                                    <h3>Quick Link</h3>
                                    <ul>
                                        <li>Bunny's Blog</li>
                                        <li>Products</li>
                                        <li>Services</li>
                                        <li>Contact Us</li>
                                        <li>FAQ</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={2}>
                                <div className="home19">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li>Bunny's Blog</li>
                                        <li>Products</li>
                                        <li>Services</li>
                                        <li>Contact Us</li>
                                        <li>FAQ</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={4}>
                                <div className="home20">
                                    <h3>Subscribe</h3>
                                    <h5>Stay up to date with our latest products.</h5>
                                    <input type="email" placeholder="Enter You Email Adress" /><br />
                                    <button>Submit</button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="home21">
                                <p>@2020 www.bunnybash.in</p>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default SpecialSer;