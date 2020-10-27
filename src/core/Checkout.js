import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth, getCookie } from '../helpers/auth'
import { generateTokenRazor, createOrder } from './apiCore';
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import { Form } from 'react-bootstrap'

const Checkout = ({ dm }) => {
    const [data, setData] = useState({
        address: '',
        date: '',
        time: '',
        customMessage: '',
        phone: ''
    })
    const [products, setProducts] = useState([])
    const userId = isAuth() && isAuth()._id;
    const token = getCookie('token');


    const processPayment = (userId, token, paymentData, amount) => {
        const createOrderData = {
            products: products,
            transaction_id: paymentData.razorpay_payment_id,
            amount: (amount / 100),
            address: data.address,
            phone: data.phone
        }

        createOrder(userId, token, createOrderData)

        toast.success('Order created successfully');
        emptyCart(() => {
            console.log('purchased done');
        })
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    useEffect(() => {
        setProducts(getCart());
        getTotal()
        if (isAuth()) {
            data.address = isAuth().Address.street + ", " + isAuth().Address.city + ", " + isAuth().Address.state
            data.phone = isAuth().phone
        }
    }, [dm])

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
                        description: "Thank You for shopping with us.",
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

        await getToken(userId, token, getTotal())
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
                {products.length > 0 ? (
                    <div>
                        <div className="maincart11">
                            <Form.Group >
                                <Form.Label>Delivery Address</Form.Label>
                                <Form.Control type="text" placeholder="Delivery Address" value={data.address} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" value={data.phone} />
                            </Form.Group>
                            <p>Note :- Change Address or Phone <Link className="maincart111" to={`/profile/${isAuth()._id}`}>Edit now</Link></p>
                        </div>
                        <div className="maincart12">
                            <button onClick={paymentHandler}>Pay Now</button>
                        </div>
                    </div>
                ) :
                    null
                }
            </div>)
    }

    return (
        <div>
            <ToastContainer />

            <h2 className="maincart7">Total Amount: <i class="fa fa-inr"></i>{getTotal()}</h2>

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
    );
}

export default Checkout;