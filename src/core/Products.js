import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import Carddd from './Carddd'
import { Link } from 'react-router-dom'
import Bunny from '../images_icons/logo.svg'
import '../style/product.css';
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import { Row, Col, Container } from 'react-bootstrap';
import { isAuth } from '../helpers/auth';
import { itemTotal } from '../helpers/CartHelper'


const Products = (props) => {
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
        await axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            .then(res => {
                setProduct(res.data)
                setDes(res.data.descriptiona)
                setInc(res.data.inclusiona)
                setExc(res.data.exclusiona)
                setBef(res.data.beforeyoua)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const relatedProductFetch = (productId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/related/${productId}`)
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
        820:{ items: 3 },
        1200: { items: 4 },
        1400: { items: 5 },
    }

    return (
        <div className="pro">
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
            <div>
                {
                    product && product.description &&
                    <Card product={product} showViewProductButthon={false} />
                }
            </div>
            <div className="pro2">
                <div className="pro3">
                    <ul className="pro4">
                        <li onClick={changeScreen}><button className="pro10 acctive">Description</button></li>
                        <li onClick={changeScreen1}><button className="pro11">Inclusion & Exclusions</button></li>
                        <li onClick={changeScreen2}><button className="pro12">Before you Order</button></li>
                        <li onClick={changeScreen3}><button className="pro13">Refund & Cancelation Policy</button></li>
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
            <div className="pro14">
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
                    />
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
        </div >
    );
}

export default Products;