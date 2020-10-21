import React, { useState, useEffect } from 'react';
import { isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet'

const UserDashboard = ({ history }) => {
    const [historyPro, setHistoryProduct] = useState([])
    const { name, email, Address, phone } = isAuth();
    const token = getCookie('token');

    const init = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/by/user/${isAuth()._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setHistoryProduct(res.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const handleLogout = () => {
        signout(() => {
            history.push('/');
            toast.success('Signout Successfully');
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className="ud00">
            <Helmet>
                <title>{isAuth().name}</title>
                <meta name="description" content={isAuth().Address.street} />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <ToastContainer />
            <div className="ud0">
                <div className="ud">
                    <div className="ud1">
                        <img src={`https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg`} alt="user_pic" />
                    </div>
                    <div className="ud2">
                        <ul>
                            <li><span>Name</span> - {name}</li>
                            <li><span>Email</span> - {email}</li>
                            <li><span>Phone</span> - {phone}</li>
                            <li><span>Address</span> - {Address.street}, {Address.city}, {Address.state}</li>
                        </ul>
                    </div>
                </div>

                <div className="ud3">
                    <div className="ud4">
                        <ul>
                            <li>{isAuth() && isAuth().role === 1 && <Link to="/admin/dashboard" className="ud5">Admin work</Link>}</li>
                            <li><Link className="ud5" to={`/profile/${isAuth()._id}`}>Update Profile</Link></li>
                            <li><Link className="ud5" to='/cart'>Your Cart</Link> </li>
                            <li>{isAuth() && <button onClick={handleLogout} > Logout </button>}</li>
                            <li><a className="ud5" href='#oorder'>Your Order</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {
                historyPro.length == 0 ? <h1 className="norelpro" style={{ textAlign: 'center' }}>NO Orders</h1> :
                    <div className="ud7" id="oorder">
                        <h3 className="ud8">Your Orders</h3>
                        <ul className="ud9">
                            <li className="ud10">
                                {historyPro.map((h, i) => {
                                    return (
                                        <div key={i} className="ud11">
                                            <hr />
                                            <p>status : {h.status}</p> <a target="_blank" href="http://bunnybash.shiprocket.co/">Check</a>
                                            <p>Total price : <i className="fa fa-inr"></i>{h.amount}</p>
                                            <hr />
                                            {h.products.map((p, i) => {
                                                return (
                                                    <div key={i} className="ud12">
                                                        <h6>Product name: {p.name}</h6>
                                                        <h6>Count: {p.count}</h6>
                                                        <h6>Product price: <i className="fa fa-inr"></i>{p.price}</h6>
                                                        <h6>
                                                            Purchased date:{" "}
                                                            {moment(h.createdAt).fromNow()}
                                                        </h6>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>
            }

        </div>
    );
}

export default UserDashboard;






// src/Admin/AddProduct.js
// src/core/Cardd.js
// src/core/Checkout.js
// src/core/Home.js
// src/style.css
// src/style/cardd.css
// src/style/home.css