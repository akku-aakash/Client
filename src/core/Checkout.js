import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { isAuth, getCookie } from '../helpers/auth'
import { getBraintreeClientTOken, createOrder } from './apiCore';
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart } from '../helpers/CartHelper';
import { Form } from 'react-bootstrap'

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        err: '',
        instance: {},
        address: '',
        loading: false,
        street: '',
        city: '',
        state: ''
    })

    const userId = isAuth() && isAuth()._id;
    const token = getCookie('token');
    const { Address } = isAuth()
    data.address = Address.street + ", " + Address.city + ", " + Address.state

    const processPayment = (userId, token, paymentData) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`,
                {
                    paymentData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                console.log(res.data)

                const createOrderData = {
                    products: products,
                    transaction_id: res.data.transaction.id,
                    amount: res.data.transaction.amount,
                    address: data.address
                }

                createOrder(userId, token, createOrderData)

                setData({ ...data, success: res.data.success });
                toast.success('Payment done successfully');
                emptyCart(() => {
                    console.log('purchased done');
                })

                setData({ loading: false })
            })
            .catch(err => console.error(err));
    }

    const getToken = (userId, token) => {
        getBraintreeClientTOken(userId, token)
            .then(data => {
                if (data.error) {
                    setData({ ...data, error: data.error })
                } else {
                    setData({ ...data, clientToken: data.clientToken })
                }
            })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuth() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to='/login'>
                    <button>
                        sign in for checkout
                    </button>
                </Link>
            )
    }

    const Buy = () => {
        setData({ loading: true })
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                //once you have nonce (card type, card number) send nonce as 'PaymentMethodNonce'
                //and also total to be charged
                // console.log('send nonce and total to proces: ', nonce, getTotal(products))

                const paymentData = {
                    PaymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)

            })
            .catch(err => {
                console.log('dropin err: ', err)
                setData({ ...data, error: err.message })
            })
    }

    const showDropIn = () => {

        return (
            <div onBlur={() => setData({ ...data, error: '' })}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }} onInstance={instance => data.instance = instance} />
                        <button onClick={Buy} className='btn btn-success'>Pay</button>
                    </div>
                ) :
                    null
                }
            </div>)
    }

    const ShowError = error => {
        return (
            <div className='alert alert-danger'>{error}</div>
        )
    }

    const showLoading = (loading) => {
        return (
            loading && <h2>loading....</h2>
        )

    }

    return (
        <div>
            <ToastContainer />
            
            {showLoading(data.loading)}
            
            <h2>Total: <i class="fa fa-inr"></i>{getTotal()}</h2>
            
            <div>
                {
                    isAuth().Address.city == "" ? <p>Update your address :-<Link to='/user/dashboard'>Update Address</Link></p> :
                        <div>
                            <Form.Group >
                                <Form.Label>Delivery Address</Form.Label>
                                <Form.Control type="text" placeholder="Delivery Address" value={data.address} />
                            </Form.Group>
                            {
                                isAuth().phone == null ? <p>Update Your Phone <Link to='/user/dashboard'>Edit Profile</Link></p> :
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" value={isAuth().phone} />
                                    </Form.Group>
                            }
                            <p>Note:- If you want to any change in Address or phone <Link to='/user/dashboard'>Edit Profile</Link></p>
                        </div>
                }
            </div>
            
            <div>
                {
                    isAuth().Address.city == "" ? <p>For Check Out Please Edit Your Address</p> : <div>{
                        isAuth().phone == null ? <p>Please Check your phone numbe for checkout</p> :
                            showCheckout()
                    }</div>
                }
            </div>
            
            {ShowError(data.error)}
        </div>
    );
}

export default Checkout;