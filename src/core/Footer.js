import React from 'react';
import {Col, Row, Container} from 'react-bootstrap'

const Footer = () => {
    return (
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
                                    <li><a href="jdfakkl">Bunny's Blog</a></li>
                                    <li><a href="jdfakkl">Products</a></li>
                                    <li><a href="jdfakkl">Services</a></li>
                                    <li><a href="jdfakkl">Contact Us</a></li>
                                    <li><a href="jdfakkl">FAQ</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2}>
                            <div className="home19">
                                <h3>Follow Us</h3>
                                <ul>
                                <li><a href="jdfakkl">Bunny's Blog</a></li>
                                <li><a href="jdfakkl">Products</a></li>
                                <li><a href="jdfakkl">Services</a></li>
                                <li><a href="jdfakkl">Contact Us</a></li>
                                <li><a href="jdfakkl">FAQ</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4}>
                            <div className="home20">
                                <h3>Subscribe</h3>
                                <h5>Stay up to date with our latest products.</h5>
                                <input type="email" placeholder="Enter You Email Adress" /><br />
                                <button>Submit</button>
                                <h6>Contact Us :- 7760 299 299</h6>
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
    );
};

export default Footer;