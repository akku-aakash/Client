import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import '../style/card.css';
import '../style/sercard.css'
import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth, getCookie } from '../helpers/auth'
import { generateTokenRazor, createServiceOrder } from '../core/apiCore';
import { Form } from 'react-bootstrap'

const Card = ({ product, cityyy }) => {

    const [des, setDes] = useState(product.descriptiona);
    const [inc, setInc] = useState(product.inclusiona);
    const [exc, setExc] = useState(product.exclusiona);
    const [bef, setBef] = useState(product.beforeyoua);
    const userId = isAuth() && isAuth()._id;
    const token = getCookie('token');
    const firstuser = isAuth() && isAuth().firstbuy
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
    const [extra, setExtra] = useState([{
        date: '',
        time: '',
        special: ''
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
            phone: isAuth().phone,
            time: extra && extra.time,
            date: extra && extra.date,
            special: extra && extra.special,
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
                        description: "Thank You !!! Enjoy your day with our service.",
                        currency: "INR",
                        order_id: data.id,
                        handler: async (response) => {
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
                            <button className="btncart" onClick={paymentHandler}>Book Now</button>
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
                        <Col sm={12} lg={8}>
                            <div className="sercardd">
                                <h2>{product.name} </h2>
                                <p>{cityyy}</p>
                                <div className="sercardd12">
                                    <ShowImage item={product} url="service" />
                                </div>
                                <div className="sercardd13">
                                    <DropdownButton id="droppdown" title="Description">
                                        <div className="sercardd14">
                                            <p>{product.description}</p>
                                            <ul>
                                                {des.map((element, i) => (
                                                    <div key={i}>{element != null ?
                                                        <li>{element}</li> :
                                                        <h1 className="prooo">d</h1>}</div>
                                                ))}
                                            </ul>
                                        </div>
                                    </DropdownButton>
                                    <DropdownButton id="droppdown" title="Before You Order">
                                        <div className="sercardd14">
                                            <ul>
                                                {bef.map((element, i) => (
                                                    <div key={i}>{element != null ?
                                                        <li>{element}</li> :
                                                        <h1 className="prooo">d</h1>}</div>
                                                ))}
                                            </ul>
                                        </div>
                                    </DropdownButton>
                                    <DropdownButton id="droppdown" title="Inclusion & Exclusions">
                                        <div className="sercardd14">
                                            <h6>Inclusion</h6>
                                            <ul>
                                                {inc.map((element, i) => (
                                                    <div key={i}>{element != null ?
                                                        <li>{element}</li> :
                                                        <h1 className="prooo">d</h1>}</div>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="sercardd14">
                                            <h6>Exclusion</h6>
                                            <ul>
                                                {exc.map((element, i) => (
                                                    <div key={i}>{element != null ?
                                                        <li>{element}</li> :
                                                        <h1 className="prooo">d</h1>}</div>
                                                ))}
                                            </ul>
                                        </div>
                                    </DropdownButton>
                                    <DropdownButton id="droppdown" title="Refund And Cancelation Policy">
                                        <div className="sercardd14">
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="sercardd14">
                                            <ul>
                                                {des.map((element, i) => (
                                                    <div key={i}>{element != null ?
                                                        <li>{element}</li> :
                                                        <h1 className="prooo">d</h1>}</div>
                                                ))}
                                            </ul>
                                        </div>
                                    </DropdownButton>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} lg={4}>
                            <div className="sercardd2">
                                {
                                    availCoup.code === coupon ? <h6>{
                                        firstuser === true ? <h3> Starting from <i className="fa fa-inr"></i>{
                                            priiice
                                        }</h3> : <h3> Starting from<i className="fa fa-inr"></i> {product.price}  <span> {product.fakeprice}</span></h3>
                                    }</h6> :
                                        <h3>Starting from <i className="fa fa-inr"></i> {product.price}  <span> {product.fakeprice}</span> <sup>{((fakeprice - priiice) / fakeprice * 100).toFixed(0)}% off</sup></h3>
                                }
                                {
                                    product.active = 1 ? <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Not Active Currently</p>
                                }
                                <ul>
                                    <li>- Handpicked Sevices</li>
                                    <li>- Secure Payments</li>
                                    <li>- Hassle-free Planning</li>
                                    <li>- No hidden Charges</li>
                                    <li>- 100% Customer Satisfaction</li>
                                </ul>
                                <div className="sercardd21">
                                    <div className="sercardd22">
                                        <input type="text" placeholder="DD / MM / YYYY" value={extra.date} onChange={(e) => setExtra({ ...extra, date: e.target.value })} />
                                        <div className="coup">
                                            <p>Choose the date</p>
                                        </div>
                                    </div>
                                    <div className="sercardd23">
                                        <input type="text" placeholder=" Hr : mm  AM/PM" value={extra.time} onChange={(e) => setExtra({ ...extra, time: e.target.value })} />
                                        <div className="coup">
                                            <p>Choose the time</p>
                                        </div>
                                    </div>
                                    <div className="sercardd24">
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
                                    <div>
                                        <Form.Group>
                                            <Form.Label>Special Request</Form.Label>
                                            <Form.Control className="sercardd25" as="textarea" rows={3} value={extra.special} onChange={(e) => setExtra({ ...extra, special: e.target.value })} placeholder="Special Request" />
                                        </Form.Group>
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