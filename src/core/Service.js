import React, { useState, useEffect } from 'react';
import Card from '../Service/Card';
import axios from 'axios';
import Carddd from './Carddd'
import '../style/product.css';
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import Menu from './Menu'
import { Helmet } from 'react-helmet';
import Loading from '../homeCore/LoadingPage';
import $ from 'jquery';

const Products = (props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [des, setDes] = useState([]);
    const [inc, setInc] = useState([]);
    const [exc, setExc] = useState([]);
    const [bef, setBef] = useState([]);

    

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
        relatedProductFetch(productId)
    }, [props])

    const loadSingleProduct = async productId => {
        await axios.get(`${process.env.REACT_APP_API_URL}/service/${productId}`)
            .then(res => {
                setProduct(res.data)
                setDes(res.data.descriptiona)
                setInc(res.data.inclusiona)
                setExc(res.data.exclusiona)
                setBef(res.data.beforeyoua)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const relatedProductFetch = (productId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/service/related/${productId}`)
            .then(res => {
                setRelatedProduct(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeScreen = () => {
        const proo = document.querySelector('.pro6')
        proo.style.marginLeft = '0vw';

        var element = document.querySelector(".pro10");
        element.classList.add("acctive");
        var element1 = document.querySelector(".pro11");
        element1.classList.remove("acctive");
        var element2 = document.querySelector(".pro12");
        element2.classList.remove("acctive");
        var element3 = document.querySelector(".pro13");
        element3.classList.remove("acctive");
    }
    const changeScreen1 = () => {
        const prooo = document.querySelector('.pro6')
        prooo.style.marginLeft = '-100vw';

        var element = document.querySelector(".pro10");
        element.classList.remove("acctive");
        var element1 = document.querySelector(".pro11");
        element1.classList.add("acctive");
        var element2 = document.querySelector(".pro12");
        element2.classList.remove("acctive");
        var element3 = document.querySelector(".pro13");
        element3.classList.remove("acctive");
    }
    const changeScreen2 = () => {
        const proooo = document.querySelector('.pro6')
        proooo.style.marginLeft = '-200vw';

        var element = document.querySelector(".pro10");
        element.classList.remove("acctive");
        var element1 = document.querySelector(".pro11");
        element1.classList.remove("acctive");
        var element2 = document.querySelector(".pro12");
        element2.classList.add("acctive");
        var element3 = document.querySelector(".pro13");
        element3.classList.remove("acctive");
    }
    const changeScreen3 = () => {
        const prooooo = document.querySelector('.pro6')
        prooooo.style.marginLeft = '-300vw';

        var element = document.querySelector(".pro10");
        element.classList.remove("acctive");
        var element1 = document.querySelector(".pro11");
        element1.classList.remove("acctive");
        var element2 = document.querySelector(".pro12");
        element2.classList.remove("acctive");
        var element3 = document.querySelector(".pro13");
        element3.classList.add("acctive");
    }

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

    const state1 = {
        galleryItems: relatedProduct
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
        <div className="pro">
            <Helmet>
                <title>{product.name}</title>
                <meta name="description" content={product.description} />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <div>
                {
                    product && product.description &&
                    <Card product={product} showViewProductButthon={false} />
                }
            </div>
            {
                loading ? <Loading /> :
                    <div className="pro2">
                        <div className="pro3">
                            <ul className="pro4">
                                <li onClick={changeScreen}><button className="pro10 acctive">Description</button></li>
                                <li onClick={changeScreen1}><button className="pro11">Inclusion & Exclusions</button></li>
                                <li onClick={changeScreen2}><button className="pro12">Before you Order</button></li>
                                <li onClick={changeScreen3}><button className="pro13">Refund & Cancellation Policy</button></li>
                            </ul>
                        </div>
                        <div className="pro5">
                            <div className="pro6">
                                <div className="pro7">
                                    <div className="pro8">
                                        <p>{product.description}</p>
                                        <ul className="pro9">{des.map((element, i) => (
                                            <div key={i}>{element != null ? <li>{element}</li> : <h1 className="prooo">d</h1>}</div>
                                        ))}</ul>
                                    </div>
                                </div>
                                <div className="pro7">
                                    <div className="pro8">
                                        <h3>Inclusions</h3>
                                        <ul>{inc.map((element, i) => (
                                            <div key={i}>{element != null ? <li>{element}</li> : <h1 className="prooo">d</h1>}</div>
                                        ))}</ul>
                                        <h3>Exclusions</h3>
                                        <ul>{exc.map((element, i) => (
                                            <div key={i}>{element != null ? <li>{element}</li> : <h1 className="prooo">d</h1>}</div>
                                        ))}</ul>
                                    </div>
                                </div>
                                <div className="pro7">
                                    <div className="pro8">
                                        <ul>{bef.map((element, i) => (
                                            <div key={i}>{element != null ? <li>{element}</li> : <h1 className="prooo">d</h1>}</div>
                                        ))}</ul>
                                    </div>
                                </div>
                                <div className="pro7">
                                    <div className="pro8">
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <div className="pro1411">
                <h2 style={{ textAlign: 'center' }}>Related Products</h2>
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
                    {
                        relatedProduct.length == 0 ? <h2 style={{ textAlign: 'center' }} className="norelpro">No Related Products Found</h2> :
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
                    }
                </div>
            </div>
        </div >
    );
}

export default Products;