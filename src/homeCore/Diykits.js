import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Carddd from '../core/Carddd';
import AliceCarousel from 'react-alice-carousel'
import '../style/diykit.css'
import Menu from '../core/Menu'

const Diykits = () => {

    const [productByCelebrate, setProductByCelebrate] = useState([])
    const [productByParty, setProductByParty] = useState([])
    const [productByPersonal, setProductByPersonal] = useState([])

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
            <Menu />
            <ToastContainer />
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
        </div>
    );
};

export default Diykits;