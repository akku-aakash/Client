import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../helpers/auth';
import axios from "axios";
import moment from 'moment'
import Menu from '../core/Menu'
import { Link } from 'react-router-dom'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [statusValue, setStatusValue] = useState([])

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
            console.log(res.data)
            let sexaa = res.data
            setOrders(sexaa);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadOrders();
        loadStatusValue()
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
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
            <select onChange={(e) => handleStatusChange(e, ox._id)}>
                <option>Update Status</option>
                {statusValue.map((status, index) => {
                    return (
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
                <h1 className="addpro22" style={{ color: "red" }}>
                    Total orders: {orders.length}
                </h1>
            )
        } else {
            return <h1 className="addpro22" style={{ color: "orange" }}>No Orders Now !!!</h1>
        }

    }

    const showInput = (key, value) => (
        <div>
            <div>
                <div>{key}</div>
            </div>
            <input type='text' value={value} className='form-control' readOnly />
        </div>
    )

    return (
        <div>
            <Menu />

            <div class="mobile_nav">
                <div class="nav_bar">
                    <img src={`https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg`} class="mobile_profile_image" alt="" />
                    <i class="fa fa-bars nav_btn"></i>
                </div>
                <div class="mobile_nav_items">
                    <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                    <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>Create Category</Link>
                    <Link className="admin1" to='/create/sub/category'><i class="fa fa-desktop"></i>Create subCategory</Link>
                    <Link className="admin1" to='/create/product'><i class="fa fa-desktop"></i>Create Product</Link>
                    <Link className="admin1" to='/create/events'><i class="fa fa-desktop"></i>Create Event</Link>
                    <Link className="admin1" to='/admin/orders'><i class="fa fa-desktop"></i>Show Orders</Link>
                    <Link className="admin1" to='/admin/products'><i class="fa fa-desktop"></i>Manage Products</Link>
                    <Link className="admin1" to={`/profile/${isAuth()._id}`}><i class="fa fa-desktop"></i>Edit Profile</Link>
                </div>
            </div>

            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg`} class="profile_image" alt="" />
                    <h4>{isAuth().name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>Create Category</Link>
                <Link className="admin1" to='/create/sub/category'><i class="fa fa-desktop"></i>Create subCategory</Link>
                <Link className="admin1" to='/create/product'><i class="fa fa-desktop"></i>Create Product</Link>
                <Link className="admin1" to='/create/events'><i class="fa fa-desktop"></i>Create Event</Link>
                <Link className="admin1" to='/admin/orders'><i class="fa fa-desktop"></i>Show Orders</Link>
                <Link className="admin1" to='/admin/products'><i class="fa fa-desktop"></i>Manage Products</Link>
                <Link className="admin1" to={`/profile/${isAuth()._id}`}><i class="fa fa-desktop"></i>Edit Profile</Link>
            </div>


            <div className="content1">
                <div>
                    {showOrderLength(orders)}
                    {orders.map((o, i) => {
                        return (
                            <div key={i} style={{ margin: '60px 0px' }}>
                                <h3><span style={{ color: '#f1bc19' }}>Order : {o._id}</span></h3>
                                <ul>
                                    <li>
                                        {showStatus(o)}
                                    </li>
                                    <li>
                                        order transaction id =  {o.transaction_id}
                                    </li>
                                    <li>
                                        order amount = <i className="fa fa-inr"></i>  {o.amount}
                                    </li>
                                    <li>
                                        order by = {o.user.name}
                                    </li>
                                    <li>
                                        Email of buyer = {o.user.email}
                                    </li>
                                    <li>

                                        order on = {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li>
                                        order shipped = {o.address}
                                    </li>
                                    <li>
                                        Contact Number = {o.phone}
                                    </li>
                                </ul>
                                <h3>total products: {o.products.length}</h3>
                                {
                                    o.products.map((p, pIndex) => {
                                        return (
                                            <div key={pIndex}>
                                                {showInput('Product name', p.name)}
                                                {showInput('Product price Rs', p.price)}
                                                {showInput('Product total', p.count)}
                                                {showInput('Product Id', p._id)}
                                                {p.category == "5f5f13c80f137d00170ba26d" ? showInput('Order Type', 'Experience Service') : showInput('Order Type', 'Products')}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Order;