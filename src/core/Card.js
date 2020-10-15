import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from '../helpers/CartHelper'
import '../style/card.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth, getCookie } from '../helpers/auth'
import { generateTokenRazor, createOrder } from './apiCore';

const Card = ({ product,
    showViewProductButthon = true,
    showAtToCart = true,
    cartUpdate = false,
    showRemoveProductButton = false }) => {

    const userId = isAuth() && isAuth()._id;
    const token = getCookie('token');
    const [Pin, setPin] = useState('');
    const firstuser = isAuth() && isAuth().firstbuy
    const [availPin, setavailPin] = useState([])
    const [coupon, setCoupon] = useState('');
    const [availCoup, setavailCoup] = useState([])
    const ref1 = useRef()
    const { _id, name, fakeprice, description, price, quantity, category } = product;
    const [priiice, setpriiice] = useState(price)
    const [shop, setShop] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const [proo, setProo] = useState({
        _id,
        name,
        description,
        price,
        quantity,
        fakeprice,
        category
    })

    const pla = () => {

        if (availCoup.code === coupon) {
            if (firstuser) {
                setpriiice(price-100)
            }
            else{
                setpriiice(price-0)
            }
        }
    }

    useEffect(() => {
        checkCoup()
        pla()
    }, [coupon])

    const showViewButton = (showViewProductButthon) => {
        return (
            showViewProductButthon && (
                <button className='btn btn-outline-primary mt-2 mb-2'>
                    View product</button>
            )
        )
    }

    const showCartButton = (showAtToCart) => {
        return (
            showAtToCart && (
                <button onClick={addToCart} className='btncart'>
                    Add to cart</button>
            )
        )
    }

    const addToCart = () => {
        addItem(proo, () => {
            setRedirect(true);
        })
    }

    const shouldGo = shop => {
        if (shop) {
            return <Redirect to='/' />
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const handleChange = productId => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if (e.target.value >= 1) {
            updateItem(productId, e.target.value)
        }
    }

    const showCartUpdateOption = cartUpdate => {
        return cartUpdate && <div>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <p className='input-group-text'>Adjust Quantity</p>
                </div>
                <input type='number' onChange={handleChange(product._id)} value={count} className='form-control' />
            </div>
        </div>
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button onClick={() => {
                    removeItem(product._id)
                }}
                    className='btn btn-outline-danger mt-2 mb-2'>
                    Remove Button
                </button>
            )
        )
    }

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
            products: product,
            transaction_id: paymentData.razorpay_payment_id,
            amount: (amount / 100),
            address: isAuth().address,
            phone: isAuth().phone
        }

        createOrder(userId, token, createOrderData)

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
                    <button>
                        sign in for checkout
                    </button>
                </Link>
            )
    }

    const showDropIn = () => {

        return (
            <div className="maincart10">
                {product && (
                    <div>
                        <div className="maincart12">
                            <button onClick={paymentHandler}>Pay Now</button>
                        </div>
                    </div>
                )
                }
            </div>)
    }



    return (
        <div className="card">
            <ToastContainer />
            {shouldRedirect(redirect)}
            {shouldGo(shop)}
            <div className="card1">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={5}>
                            <ShowImage item={product} url="product" />
                        </Col>
                        <Col sm={12} md={7}>
                            <div className="card2">
                                <h2>{product.name} </h2>
                                {
                                    product.quantity > 0 ? <p style={{ color: 'green', fontWeight: 'bold' }}>In stock</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</p>
                                }
                                {
                                    product.active = 1 ? <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Not Active Currently</p>
                                }
                                {
                                    availCoup.code === coupon ? <h6>{
                                        firstuser === true ? <h3><i className="fa fa-inr"></i>{
                                            priiice - 100
                                        }</h3> : <h3><i className="fa fa-inr"></i>{product.price}  <span>{product.fakeprice}</span></h3>
                                    }</h6> :
                                        <h3><i className="fa fa-inr"></i>{product.price}  <span>{product.fakeprice}</span></h3>
                                }
                                <p>FREE Shipping</p>
                                <p>{product.description.substring(0, 300)}</p>
                                <div className="card3">
                                    <div className="card4">
                                        <input type="text" placeholder="Pin Code" value={Pin} onChange={(e) => setPin(e.target.value)} />
                                        <p>Delivery Availability</p>
                                        {
                                            availPin[0] && availPin[0].Has_Prepaid ? <div ref={ref1}>yes</div> : <div>{}</div>
                                        }
                                        {
                                            Pin && <button onClick={checkPin}>Check</button>
                                        }
                                    </div>
                                    <div className="card4">
                                        <input type="text" placeholder="Promo Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                        <p>Promo Code</p>
                                        <h6>{availCoup.code}</h6>
                                        {
                                            availCoup.code === coupon ? <h6>{
                                                firstuser === true ? <h3>Applied !!!</h3> : <h6>NOT Applied</h6>
                                            }</h6> :
                                            null
                                        }
                                    </div>
                                </div>
                                <Link to={`/product/${product._id}`}>
                                    {showViewButton(showViewProductButthon)}
                                </Link>
                                <Link>
                                    {showCartButton(showAtToCart)}
                                </Link>
                                <div className="maincart8">
                                    {
                                        isAuth() && isAuth().Address.city == "" ? <Redirect to={`/profile/${isAuth()._id}`} />
                                            : <div>{
                                                isAuth() && isAuth().phone == null ? <Redirect to={`/profile/${isAuth()._id}`} /> :
                                                    showCheckout()
                                            }</div>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOption(cartUpdate)}
            </div>
        </div>
    );
}

export default Card;