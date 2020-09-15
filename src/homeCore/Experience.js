import React, { useEffect, useState } from 'react';
import { isAuth } from '../helpers/auth';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { itemTotal } from '../helpers/CartHelper'
import Bunny from '../images_icons/logo.svg'
import AliceCarousel from 'react-alice-carousel'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Cardd from '../core/Cardd';

const Experience = () => {

    const [productByBallon, setProductByBallon] = useState([])
    const [productBySurprise, setProductBySurprise] = useState([])
    const [productBySoul, setProductBySoul] = useState([])

    const loadProductByBallon = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e4394fa54ca2988fb3e9e`)
            .then(res => {
                setProductByBallon(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductBySurprise = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e437dfa54ca2988fb3e9c`)
            .then(res => {
                setProductBySurprise(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductBySoul = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5e4388fa54ca2988fb3e9d`)
            .then(res => {
                setProductBySoul(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    useEffect(()=>{
        loadProductByBallon()
        loadProductBySoul()
        loadProductBySurprise()
    },[])

    const responsive = {
        0: { items: 1 },
        1024: { items: 3 },
      }
    
    const state = {
        galleryItems: productByBallon
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
        galleryItems: productBySurprise
            .map((product, i) => {
                return (
                    <div>
                        <Cardd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    const state2 = {
        galleryItems: productBySoul
            .map((product, i) => {
                return (
                    <div>
                        <Cardd key={i} product={product} />
                    </div>
                )
            }
            )
    }

    return (
        <div>
            <div className="home11">
                <h2 style={{ textAlign: 'center' }}>Top Personalized Boxes</h2>
                <div className="home111">
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
                <div className="home12">
                    <Link to='/shop'> <p className="home121">View More</p></Link>
                </div>
            </div>
            <div className="home11">
                <h2 style={{ textAlign: 'center' }}>Top Personalized Boxes</h2>
                <div className="home111">
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
                        autoPlay={false}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                    />
                </div>
                <div className="home12">
                    <Link to='/shop'> <p className="home121">View More</p></Link>
                </div>
            </div>
            <div className="home11">
                <h2 style={{ textAlign: 'center' }}>Top Personalized Boxes</h2>
                <div className="home111">
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
                        autoPlay={false}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                    />
                </div>
                <div className="home12">
                    <Link to='/shop'> <p className="home121">View More</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Experience;