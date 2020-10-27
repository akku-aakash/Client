import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Cardd from '../core/Cardd';
import Cardd1 from '../core/Cardd1';
import Cardd2 from '../core/Cardd2';
import AliceCarousel from 'react-alice-carousel'
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet';
import Banner from '../images_icons/Banner 2-min.jpg'
import Banner1 from '../ceimage/Banner 2.1-min.jpg'
import { Row, Col, Container } from 'react-bootstrap'

const Unique = () => {
    const [productByPhoto, setProductByPhoto] = useState([])
    const [productByGreeting, setProductByGreeting] = useState([])
    const [productByQuirky, setProductByQuirky] = useState([])
    const [productByVirtual, setProductByVirtual] = useState([])

    const loadProductByPhoto = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f134a0f137d00170ba267`)
            .then(res => {
                setProductByPhoto(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByGreeting = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f135b0f137d00170ba269`)
            .then(res => {
                setProductByGreeting(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByQuirky = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f136c0f137d00170ba26a`)
            .then(res => {
                setProductByQuirky(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByVirtual = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f137c0f137d00170ba26b`)
            .then(res => {
                setProductByVirtual(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }


    useEffect(() => {
        loadProductByGreeting()
        loadProductByPhoto()
        loadProductByQuirky()
        loadProductByVirtual()
    }, [])

    const state = {
        galleryItems: productByGreeting
            .map((product, i) => {
                return (
                    <div>
                        <Cardd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state1 = {
        galleryItems: productByPhoto
            .map((product, i) => {
                return (
                    <div>
                        <Cardd1 key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state2 = {
        galleryItems: productByQuirky
            .map((product, i) => {
                return (
                    <div>
                        <Cardd2 key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state3 = {
        galleryItems: productByVirtual
            .map((product, i) => {
                return (
                    <div>
                        <Cardd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const responsive = {
        0: { items: 1 },
        800: { items: 2 },
        1200: { items: 3 },
    }

    return (
        <div className="unique">
            <Helmet>
                <title>Unique Category</title>
                <meta name="description" content="Unique category" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <ToastContainer />
            <div className="diy2">
                <div className="diy3">
                    <img src={Banner} alt="diyKit" />
                </div>
                <div className="diy333">
                    <img src={Banner1} alt="diyKit" />
                </div>
            </div>
            <div className="pro14">
                <h2 style={{ textAlign: 'center' }}>Greeting Cards</h2>
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
                <div className="home115">
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
                    <Link to='/products/subCategory/5f5f135b0f137d00170ba269'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="diy144">
                <h2 style={{ textAlign: 'center' }}>Photo Gifts</h2>
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
                <div className="home115">
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
                    <Link to='/products/subCategory/5f5f134a0f137d00170ba267'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="diy145">
                <h2 style={{ textAlign: 'center' }}>Quirky Gifts</h2>
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
                <div className="home115">
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
                    <Link to='/products/subCategory/5f5f136c0f137d00170ba26a'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="diy145">
                <h2 style={{ textAlign: 'center' }}>Virtual Gifts</h2>
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
                <div className="home115">
                    <AliceCarousel
                        items={state3.galleryItems}
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
                    <Link to='/products/subCategory/5f5f137c0f137d00170ba26b'> <p className="diy122">View More</p></Link>
                </div>
            </div>
            <div className="home13">
                <h2 style={{ textAlign: 'center' }}>WHY US?</h2>
                <div className="home91">
                    <div className="home94">
                        <div className="home92">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <h1><i className="fa fa-gift"></i></h1>
                        <div className="home93">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="home130">
                    <Container fluid style={{ margin: "0px", padding: "0%" }}>
                        <Row className="home134">
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <div className="home131">
                                    <div className="home132"><i className="fa fa-star"></i></div>
                                    <h6 style={{ color: '#f1bc19' }}>Experience with Experiments</h6>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <div className="home131">
                                    <div className="home132"><i className="fa fa-star"></i></div>
                                    <h6><span style={{ color: 'black' }}>Living with</span></h6>
                                    <h6 style={{ color: '#f1bc19' }}>#VocalForLocal</h6>
                                    <h6><span style={{ color: 'black' }}>Dream</span></h6>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <div className="home131">
                                    <div className="home132"><i className="fa fa-star"></i></div>
                                    <h6 style={{ color: '#f1bc19' }}>Hand Crafted</h6>
                                    <h6 style={{ color: '#f1bc19' }}>Products</h6>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <div className="home131">
                                    <div className="home132"><i className="fa fa-star"></i></div>
                                    <h6 style={{ color: '#f1bc19' }}>Promotion DIY</h6>
                                    <h6 style={{ color: '#f1bc19' }}>Culture</h6>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </div>
    );
};

export default Unique;


// <div className="diy4">
// <div className="diy5">
//     <img src={Ballon} alt="" />
// </div>
// <div className="diy6">
//     <h3>Welcome To BunnyBash</h3>
//     <h5>Parties | Rentals | Moments</h5>
// </div>
// <div className="diy7">
//     <img src={Serv} alt="" />
// </div>
// <div className="diy8">
//     <img src={Deco} alt="" />
// </div>
// </div>