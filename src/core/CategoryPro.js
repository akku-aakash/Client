import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carddd from './Carddd'
import '../style/product.css';
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import Menu from './Menu'

const Products = (props) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const subCatId = props.match.params.productId
        console.log(subCatId)
        loadSingleProduct(subCatId)
    }, [props])

    const loadSingleProduct = subCatId => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/by/sub/category?subCategory=${subCatId}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const state1 = {
        galleryItems: product
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
            <Menu />
            <div className="pro14">
                <h2 style={{ textAlign: 'center' }}>Products</h2>
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
        </div >
    );
}

export default Products;