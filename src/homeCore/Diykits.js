import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Cardd from '../core/Cardd';
import Cardd1 from '../core/Cardd1';
import Cardd2 from '../core/Cardd2';
import AliceCarousel from 'react-alice-carousel'
import '../style/diykit.css'
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet';
import Banner from '../images_icons/Banner 1-min.jpg'
import Banner1 from '../ceimage/Banner 1.1-min.jpg'
import { Row, Col, Container } from 'react-bootstrap'
import $ from 'jquery';

const Diykits = () => {
    const [productByCelebrate, setProductByCelebrate] = useState([])
    const [productByParty, setProductByParty] = useState([])
    const [productByPersonal, setProductByPersonal] = useState([])

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

    const loadProductByPersonal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f12f10f137d00170ba262`)
            .then(res => {
                setProductByPersonal(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByCelebrate = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f12b00f137d00170ba260`)
            .then(res => {
                setProductByCelebrate(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductByParty = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f12ce0f137d00170ba261`)
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
                        <Cardd key={i} product={product} />
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
                        <Cardd1 key={i} product={product} />
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
                        <Cardd2 key={i} product={product} />
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
        <div className="diy">
            <Menu />
            <Helmet>
            <title>Do it yourself theme party boxes, diy decor box </title>
            <meta name="description" content="Buy birthday decoration kit online. Give personal touch to birthday, anniversary, baby shower, housewarming parties, festive celebrations, and pets birthdays" />
            <meta name="author" content="Bunny Bash" />
            <meta name="robots" content="index, follow" />
            <meta name="keywords" content="diy decor box, birthday decoration kit online, festive diy boxes, baby shower diy kit, pets birthday kit, anniversary decor kit, surprise decor kit" />
            </Helmet>
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
                    <Link to='/products/subCategory/5f5f12b00f137d00170ba260'> <p className="diy122">View More</p></Link>
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
                    <Link to='/products/subCategory/5f5f12f10f137d00170ba262'> <p className="diy122">View More</p></Link>
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
                    <Link to='/products/subCategory/5f5f12ce0f137d00170ba261'> <p className="diy122">View More</p></Link>
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

export default Diykits;



// <div className="diy2">
// <div className="diy3">
//     <div className="diy4">
//         <div className="diy5">
//             <img src={Ballon} alt="" />
//         </div>
//         <div className="diy6">
//             <h3>Welcome To BunnyBash</h3>
//             <h5>Parties | Rentals | Moments</h5>
//         </div>
//         <div className="diy7">
//             <img src={Serv} alt="" />
//         </div>
//         <div className="diy8">
//             <img src={Deco} alt="" />
//         </div>
//     </div>
// </div>
// </div>