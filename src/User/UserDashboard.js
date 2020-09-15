import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const UserDashboard = ({ history }) => {
    const [historyPro, setHistoryProduct] = useState([])
    const { name, email, role } = isAuth();
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
        <div>
            <ToastContainer />
            <Layout title='User Dashboard' description={`hello ${name}`}>
                <div>
                    <ul>
                        <li>{isAuth() && isAuth().role === 1 && <Link to="/admin/dashboard">Admin work</Link>}</li>
                        <li><Link to={`/profile/${isAuth()._id}`}>Update Profile</Link></li>
                        <li><Link to='/cart'>Cart</Link></li>
                        <li>{isAuth() && <button onClick={handleLogout} > Logout </button>}</li>
                    </ul>
                </div>


                <div>
                    <h3>User Info</h3>
                    <ul>
                        <li>{name}</li>
                        <li>{email}</li>
                        <li>{role === 1 ? 'admin' : 'client'}</li>
                    </ul>
                </div>
                <div className="card mb-5">
                    <h3 className="card-header">Purchase history</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            {historyPro.map((h, i) => {
                                return (
                                    <div key={i}>
                                        <hr />
                                        {h.products.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <h6>Product name: {p.name}</h6>
                                                    <h6>Product price: ${p.price}</h6>
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
            </Layout>
        </div>
    );
}

export default UserDashboard;
