import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import '../style/card.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth, getCookie } from '../helpers/auth'
import { generateTokenRazor, createServiceOrder } from '../core/apiCore';

const Card = ({ product }) => {

    const userId = isAuth() && isAuth()._id;
    const token = getCookie('token');
    const [Pin, setPin] = useState('');
    const firstuser = isAuth() && isAuth().firstbuy
    const [availPin, setavailPin] = useState([])
    const [coupon, setCoupon] = useState('');
    const [availCoup, setavailCoup] = useState([])
    const { fakeprice, price } = product;
    const [priiice, setpriiice] = useState(price)
    const [prio, setPrio] = useState([{
        name: product.name,
        description: product.Semail,
        price: priiice,
        Semail: product.Semail,
        count: 1
    }])
    
    const pla = () => {

        if (availCoup.code === coupon) {
            if (firstuser) {
                setpriiice(price - 100)
            }
            else {
                setpriiice(price - 0)
            }
        } else {
            setpriiice(price - 0)
        }
    }

    useEffect(() => {
        checkCoup()
        pla()
    }, [coupon])

    useEffect(() => {
        checkPin()
    }, [Pin])

    const checkPin = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/delivery/availabe`, {
                params: {
                    Pincode: Pin
                }
            })
            .then(res =>
                setavailPin(res.data),
            )
            .catch(err => console.error(err));
    }

    const checkCoup = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/coupons`)
            .then(res =>
                setavailCoup(res.data[0]),
            )
            .catch(err => console.error(err));
    }

    const processPayment = (userId, token, paymentData, amount) => {
        const createOrderData = {
            products: prio,
            transaction_id: paymentData.razorpay_payment_id,
            amount: (amount / 100),
            address: isAuth().address,
            phone: isAuth().phone
        }

        createServiceOrder(userId, token, createOrderData)

        toast.success('Order created successfully');
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const paymentHandler = async () => {

        const res = loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const getToken = (userId, token, getTotal) => {
            generateTokenRazor(userId, token, getTotal)
                .then(data => {
                    const options = {
                        key: "rzp_live_uWRIY5ByKxBfPZ",
                        name: "Bunny Bash",
                        description: "Some Description",
                        currency: "INR",
                        order_id: data.id,
                        handler: async (response) => {
                            alert(response.razorpay_payment_id)
                            alert(response.razorpay_order_id)
                            alert(response.razorpay_signature)
                            console.log('payment done')
                            processPayment(userId, token, response, data.amount);
                        },
                        theme: {
                            color: "#f1bc19",
                        }
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                })
        }

        await getToken(userId, token, priiice)
    }

    const showCheckout = () => {
        return isAuth() ? (
            <div>{
                showDropIn()}</div>
        ) : (
                <Link to='/login'>
                    <button className="btncart">
                        Checkout
                    </button>
                </Link>
            )
    }

    const showDropIn = () => {

        return (
            <div className="maincart10">
                {product && (
                    <div>
                        <div>
                            <button className="btncart" onClick={paymentHandler}>Pay Now</button>
                        </div>
                    </div>
                )
                }
            </div>)
    }



    return (
        <div className="card">
            <ToastContainer />
            <div className="card1">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={5}>
                            <ShowImage item={product} url="service" />
                        </Col>
                        <Col sm={12} md={7}>
                            <div className="card2">
                                <h2>{product.name} </h2>
                                {
                                    product.active = 1 ? <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Not Active Currently</p>
                                }
                                {
                                    availCoup.code === coupon ? <h6>{
                                        firstuser === true ? <h3><i className="fa fa-inr"></i>{
                                            priiice
                                        }</h3> : <h3><i className="fa fa-inr"></i> {product.price}  <span> {product.fakeprice}</span></h3>
                                    }</h6> :
                                        <h3><i className="fa fa-inr"></i> {product.price}  <span> {product.fakeprice}</span> <sup>{((fakeprice - priiice) / fakeprice * 100).toFixed(0)}% off</sup></h3>
                                }
                                <p>FREE Shipping</p>
                                <p>{product.description.substring(0, 300)}</p>
                                <div className="card3">
                                    <div className="card4">
                                        <input type="text" placeholder="Pin Code" value={Pin} onChange={(e) => setPin(e.target.value)} />
                                        <div className="coup">
                                            <p>Delivery Availability</p>
                                            <p className="coup2">{
                                                availPin[0] && availPin[0].Has_Prepaid ? <p style={{ color: 'green' }}><i class="fa fa-check-circle" aria-hidden="true"></i></p> : <p style={{ color: 'red' }}>{Pin && <p><i class="fa fa-times-circle" aria-hidden="true"></i></p>}</p>
                                            }</p>
                                        </div>
                                    </div>
                                    <div className="card4">
                                        <input type="text" placeholder="Promo Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                        <div className="coup">
                                            <p>Promo Code</p>
                                            <p className="coup1">{
                                                availCoup.code === coupon ? <p>{
                                                    firstuser === true ? <p style={{ color: 'green' }}>Applied !!!</p> : <p style={{ color: 'red' }}>NOT Applied!!!</p>
                                                }</p> :
                                                    <p>{coupon && <p style={{ color: 'red' }}>NOT Applied!!!</p>}</p>
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="finall">
                                    <div className="finall1">
                                        {
                                            isAuth() && isAuth().Address.city == "" ? <Redirect to={`/profile/${isAuth()._id}`} />
                                                : <div>{
                                                    isAuth() && isAuth().phone == null ? <Redirect to={`/profile/${isAuth()._id}`} /> :
                                                        showCheckout()
                                                }</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Card;