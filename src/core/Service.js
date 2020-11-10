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

    const cityyy = props.match.params.cityName

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
        relatedProductFetch(productId)
    }, [props])

    const loadSingleProduct = async productId => {
        await axios.get(`${process.env.REACT_APP_API_URL}/service/${productId}`)
            .then(res => {
                setProduct(res.data)
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

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [product])


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
                    <Card product={product} cityyy={cityyy} showViewProductButthon={false} />
                }
            </div>

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