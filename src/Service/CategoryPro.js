import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cardd from './Cardd'
import '../style/product.css';
import Menu from '../core/Menu'
import { Col, Row, Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet';

const Products = (props) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const subCatId = props.match.params.productId
        loadSingleProduct(subCatId)
    }, [props])

    const loadSingleProduct = subCatId => {
        axios.get(`${process.env.REACT_APP_API_URL}/service/by/sub/category?subCategory=${subCatId}&limit=50`)
            .then(res => {
                setProduct(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                <h2 style={{ textAlign: 'center' }}>Services</h2>
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
                    <Container fluid >
                        <Row>
                            {
                                product
                                    .map((product, i) => {
                                        return (
                                            <Col xs={12} sm={6} lg={4} style={{ margin: "10px 0px 40px 0px" }}>
                                                <Cardd key={i} product={product} />
                                            </Col>
                                        )
                                    }
                                    )
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        </div >
    );
}

export default Products;