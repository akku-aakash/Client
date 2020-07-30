import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import axios from "axios";
import moment from 'moment'

const Order = (props) => {
    const [orders, setOrders] = useState([])
    const [statusValue, setStatusValue] =useState([])

    const token = getCookie('token');
    const userId = isAuth()._id;

    const loadStatusValue = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/status-value/${userId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setStatusValue(res.data);
        }).catch((err) => {
            console.log(err.response.data.error)
        })
    }

    const loadOrders = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/list/${userId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            let sexaa = res.data
            setOrders(sexaa);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadOrders();
        loadStatusValue()
    }, [])

    const handleStatusChange = (e, orderId) => {
        let status = e.target.value
        const updateOrderStatus = () => {
            axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}/status/${userId}`,
             {
                status, orderId
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                loadOrders()
            }).catch((err) => {
                console.log(err)
            })
        }
        updateOrderStatus();
    }

    const showStatus = (ox) => (
        <div>
        <h3>Status: {ox.status}</h3>
        <select onChange={(e) => handleStatusChange(e,ox._id)}>
        <option>Update Status</option>
        {statusValue.map((status, index) => {
            return(
                <option key={index} value={status}>
            {status}
            </option>
            )
        })}
        </select>
        </div>
    )

    const showOrderLength = orders => {
        if (orders.length > 0) {
            return (
                <h1 className='text-danger display-2'>
                    Total orders: {orders.length}
                </h1>
            )
        } else {
            return <h1>no orders</h1>
        }

    }

    const showInput = (key, value) => (
        <div>
        <div>
        <div>{key}</div>
        </div>
        <input type='text' value={value} className='form-control' readOnly/>
        </div>
    )

    return (
        <Layout title='Orders'
            description={`Hey ${isAuth().name} here are the orders`} >
            <div>
                <div>
                    {showOrderLength(orders)}
                    {orders.map((o, i) => {
                        return (
                            <div key={i}>
                                <h3><span>Order : {o._id}</span></h3>
                                <ul>
                                    <li>
                                      {showStatus(o)}
                                    </li>
                                    <li>
                                      order transaction id =  {o.transaction_id}
                                    </li>
                                    <li>
                                       order amount = ${o.amount}
                                    </li>
                                    <li>
                                       order by = {o.user.name}
                                    </li>
                                    <li>

                                       order on = {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li>
                                    order shipped = {o.address}
                                    </li>
                                </ul>
                                <h3>total products: {o.products.length}</h3>
                                {
                                    o.products.map((p, pIndex) => {
                                        return(
                                        <div key={pIndex}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price $', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product Id', p._id)}
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Order;