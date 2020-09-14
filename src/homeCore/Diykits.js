import React, { useEffect, useState } from 'react';
import { isAuth } from '../helpers/auth';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/logo.svg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Carddd from '../core/Carddd';
import AliceCarousel from 'react-alice-carousel'
import '../style/diykit.css'

const Diykits = () => {

    const [productByCelebrate, setProductByCelebrate] = useState([])
    const [productByParty, setProductByParty] = useState([])
    const [productByPersonal, setProductByPersonal] = useState([])

    const loadProductByPersonal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e4394fa54ca2988fb3e9e`)
            .then(res => {
                setProductByPersonal(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByCelebrate = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e437dfa54ca2988fb3e9c`)
            .then(res => {
                setProductByCelebrate(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByParty = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e4388fa54ca2988fb3e9d`)
            .then(res => {
                setProductByParty(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    useEffect(() => {
        loadProductByCelebrate();
        loadProductByParty();
        loadProductByPersonal();
    }, [])

    const state = {
        galleryItems: productByCelebrate
            .map((product, i) => {
                return (
                    <div>
                        <Carddd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state1 = {
        galleryItems: productByPersonal
            .map((product, i) => {
                return (
                    <div>
                        <Carddd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state2 = {
        galleryItems: productByParty
            .map((product, i) => {
                return (
                    <div>
                        <Carddd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const responsive = {
        0: { items: 1 },
        550: { items: 2 },
        820: { items: 3 },
        1200: { items: 4 },
        1400: { items: 5 },
    }

    return (
        <div className="diy">
            <ToastContainer />
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
            <div className="pro14">
                <h2 style={{ textAlign: 'center' }}>Celebration DIY Kit</h2>
                <div className="pro15">
                    <div className="home114">
                        <div className="home112">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <h1><i className="fa fa-star-half-o"></i></h1>
                        <div className="home113">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="pro16">
                    <AliceCarousel
                        items={state.galleryItems}
                        responsive={responsive}
                        autoPlayInterval={5000}
                        autoPlayDirection="rtl"
                        autoPlay={false}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                    />
                </div>
                <div className="diy121">
                    <Link to='/products/subCategory/5f5e437dfa54ca2988fb3e9c'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="diy144">
                <h2 style={{ textAlign: 'center' }}>Personalised Prints</h2>
                <div className="pro15">
                    <div className="home114">
                        <div className="home112">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <h1><i className="fa fa-star-half-o"></i></h1>
                        <div className="home113">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="pro16">
                    <AliceCarousel
                        items={state1.galleryItems}
                        responsive={responsive}
                        autoPlayInterval={5000}
                        autoPlayDirection="rtl"
                        autoPlay={true}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                    />
                </div>
                <div className="diy121">
                    <Link to='/products/subCategory/5f5e4394fa54ca2988fb3e9e'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="diy145">
                <h2 style={{ textAlign: 'center' }}>Party Bunting</h2>
                <div className="pro15">
                    <div className="home114">
                        <div className="home112">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <h1><i className="fa fa-star-half-o"></i></h1>
                        <div className="home113">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="pro16">
                    <AliceCarousel
                        items={state2.galleryItems}
                        responsive={responsive}
                        autoPlayInterval={5000}
                        autoPlayDirection="rtl"
                        autoPlay={true}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                    />
                </div>
                <div className="diy121">
                    <Link to='/products/subCategory/5f5e4388fa54ca2988fb3e9d'> <p className="diy122">View More</p></Link>
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

export default Diykits;