import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cardd from './Cardd'
import '../style/product.css';
import Menu from '../core/Menu'
import { Col, Row, Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import Goa from '../shimg/Goa.png'
import Hyd from '../shimg/Hyd.png'
import Mum from '../shimg/Mumbai.png'
import $ from 'jquery';
import Pune from '../shimg/Pune.png'

const Products = (props) => {

    const [product, setProduct] = useState([])
    const [city, setCity] = useState('Banglore')

    useEffect(() => {
        const subCatId = props.match.params.productId
        loadSingleProduct(subCatId)
    }, [city, props])

    const loadSingleProduct = subCatId => {
        axios.get(`${process.env.REACT_APP_API_URL}/service/by/sub/category?subCategory=${subCatId}&limit=50&search=${city}`)
            .then(res => {
                setProduct(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

    return (
        <div className="pro">
            <Helmet>
                <title>{props.match.params.productId}</title>
                <meta name="description" content="fakdsfj adsjfkjasdhfj asdhfjkdsjkjkh" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <div className="pro14">
                <h2 style={{ textAlign: 'center' }}>Services in {city}</h2>
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
                <div className="expp2">
                    <div className="expp">
                        <ul className="expp1">
                            <li onClick={() => setCity('Goa')}><img src={Goa} alt="del" /><p>Goa</p></li>
                            <li onClick={() => setCity('Hyderabad')}><img src={Hyd} alt="del" /> <p>Hyderabad</p></li>
                            <li onClick={() => setCity('Mumbai')}><img src={Mum} alt="del" /><p>Mumbai</p></li>
                            <li onClick={() => setCity('Pune')}><img src={Pune} alt="del" /><p>Pune</p></li>
                        </ul>
                    </div>
                </div>
                <div className="pro16">
                    <Container fluid >
                        {
                            product && product.length === 0 ?
                                <h4>No Service found in {city}</h4>
                                :
                                <Row>
                                    {
                                        product
                                            .map((product, i) => {
                                                return (
                                                    <Col xs={12} sm={6} lg={4} style={{ margin: "10px 0px 40px 0px" }}>
                                                        <Cardd key={i} product={product} city={city}/>
                                                    </Col>
                                                )
                                            }
                                            )
                                    }
                                </Row>
                        }
                    </Container>
                </div>
            </div>
        </div >
    );
}

export default Products;