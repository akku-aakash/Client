import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import {toast,ToastContainer} from 'react-toastify'

const Footer = () => {

    const [email, setEmail] = useState('')

    const greet = () => {
        if(email){
            toast.success('Thank You !!!!')
        }
        else{
            toast.error('Please provide email !!!')
        }
    }

    return (
        <div className="home15">
        <ToastContainer />
            <div className="home16">
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={4}>
                            <div className="home17">
                                <h3>About Us</h3>
                                <p>Buy online birthday decoration kit, diy decor box for an anniversary, baby
                                shower and festivals. Explore unique gift ideas, birthday gifts, surprise gifts,
                                virtual gifts. Book birthday and surprise planners, candlelight dinners, home surprises,
                                   and pan India experiences and activities for couples, families, and corporates.</p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2}>
                            <div className="home18">
                                <h3>Quick Link</h3>
                                <ul>
                                    <li><a href="https://blog.bunnybash.in/" target="_blank">Bunny's Blog</a></li>
                                    <li><a href="/products/special/services">Cele Bash</a></li>
                                    <li><a href="/products/experience">Experiences</a></li>
                                    <li><a href="/products/unique/gifts">Unique Gifts</a></li>
                                    <li><a href="/products/diykit">Diy Kits</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2}>
                            <div className="home19">
                                <h3>Follow Us</h3>
                                <ul>
                                    <li><a href="https://blog.bunnybash.in/" target="_blank">Bunny's Blog</a></li>
                                    <li><a href="/products/diykit">Products</a></li>
                                    <li><a href="/special/services">Services</a></li>
                                    <li><a href="tel:7760 299 299">Contact Us</a></li>
                                    <li><a href="">FAQ</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4}>
                            <div className="home20">
                                <h3>Subscribe</h3>
                                <h5>Stay up to date with our latest products.</h5>
                                <input type="email" placeholder="Enter You Email Adress" value={email} onChange={(e) => { setEmail(e.target.value)}} /><br />
                                <button onClick={greet}>Submit</button>
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