import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Cardd from '../core/Cardd';
import Menu from '../core/Menu';
import { Helmet } from 'react-helmet';
import Coming from '../images_icons/comingsoon.svg'
import '../style/Cele.css'

const Experience = () => {

    const [productByBallon, setProductByBallon] = useState([])
    const [productBySurprise, setProductBySurprise] = useState([])
    const [productBySoul, setProductBySoul] = useState([])

    const loadProductByBallon = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f13080f137d00170ba263`)
            .then(res => {
                setProductByBallon(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductBySurprise = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f131d0f137d00170ba264`)
            .then(res => {
                setProductBySurprise(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    const loadProductBySoul = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=5f5f13300f137d00170ba265`)
            .then(res => {
                setProductBySoul(res.data);
            })
            .catch(err => {
                toast.error(`Server Error`, err);
            });
    }

    useEffect(() => {
        loadProductByBallon()
        loadProductBySoul()
        loadProductBySurprise()
    }, [])

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
            <Helmet>
                <title>Experiences</title>
                <meta name="description" content="Experience fadsfasdf  adsfsadf " />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <ToastContainer />
            <Menu />
            <div className="cele">
                <div className="cele1">
                    <img src={Coming} alt="comming soon"/>
                </div>
                <div className="cele2">
                    <h1>Comming Soon</h1>
                </div>
            </div>
            </div>
    );
};

export default Experience;


// <div className="home11">
// <h2 style={{ textAlign: 'center' }}>Baloon Decoration</h2>
// <div className="home111">
//     <div className="home114">
//         <div className="home112">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//         <h1><i className="fa fa-star-half-o"></i></h1>
//         <div className="home113">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//     </div>
// </div>
// <div className="home115">
//     <AliceCarousel
//         items={state.galleryItems}
//         responsive={responsive}
//         autoPlayInterval={5000}
//         autoPlayDirection="rtl"
//         autoPlay={false}
//         fadeOutAnimation={true}
//         mouseTrackingEnabled={true}
//         playButtonEnabled={false}
//         disableAutoPlayOnAction={true}
//         dotsDisabled={true}
//         buttonsDisabled={true}
//     />
// </div>
// <div className="home12">
//     <Link to='/products/subCategory/5f5f13080f137d00170ba263'> <p className="home121">View More</p></Link>
// </div>
// </div>
// <div className="home11">
// <h2 style={{ textAlign: 'center' }}>Surprise Delivery</h2>
// <div className="home111">
//     <div className="home114">
//         <div className="home112">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//         <h1><i className="fa fa-star-half-o"></i></h1>
//         <div className="home113">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//     </div>
// </div>
// <div className="home115">
//     <AliceCarousel
//         items={state1.galleryItems}
//         responsive={responsive}
//         autoPlayInterval={5000}
//         autoPlayDirection="rtl"
//         autoPlay={false}
//         fadeOutAnimation={true}
//         mouseTrackingEnabled={true}
//         playButtonEnabled={false}
//         disableAutoPlayOnAction={true}
//         dotsDisabled={true}
//         buttonsDisabled={true}
//     />
// </div>
// <div className="home12">
//     <Link to='/products/subCategory/5f5f131d0f137d00170ba264'> <p className="home121">View More</p></Link>
// </div>
// </div>
// <div className="home11">
// <h2 style={{ textAlign: 'center' }}>Soul Ecstacy</h2>
// <div className="home111">
//     <div className="home114">
//         <div className="home112">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//         <h1><i className="fa fa-star-half-o"></i></h1>
//         <div className="home113">
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//     </div>
// </div>
// <div className="home115">
//     <AliceCarousel
//         items={state2.galleryItems}
//         responsive={responsive}
//         autoPlayInterval={5000}
//         autoPlayDirection="rtl"
//         autoPlay={false}
//         fadeOutAnimation={true}
//         mouseTrackingEnabled={true}
//         playButtonEnabled={false}
//         disableAutoPlayOnAction={true}
//         dotsDisabled={true}
//         buttonsDisabled={true}
//     />
// </div>
// <div className="home12">
//     <Link to='/products/subCategory/5f5f13300f137d00170ba265'> <p className="home121">View More</p></Link>
// </div>
// </div>
    