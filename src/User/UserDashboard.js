import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';

const UserDashboard = () => {
    const [history, setHistory] = useState([])
    const { name, email, role } = isAuth();
    const token = getCookie('token');

    const init = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/by/user/${isAuth()._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setHistory(res.data);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <Layout title='User Dashboard' description={`hello ${name}`}>
                <div>
                    <ul>
                        <li><Link to={`/profile/${isAuth()._id}`}>Update Profile</Link></li>
                        <li><Link to='/cart'>Cart</Link></li>
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
                            {history.map((h, i) => {
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
