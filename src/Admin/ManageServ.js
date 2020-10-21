import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../helpers/auth';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom';
import Menu from '../core/Menu'
import { Button } from 'react-bootstrap'

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const token = getCookie('token');
    const { _id } = isAuth();

    const getProducts = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/service?limit=undefined`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getProducts();
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    }, []);


    const deleteProducts = (productId) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/service/${productId}/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(res => {
                getProducts();
                toast('Product deleted successfully')
            })
            .catch(err => console.error(err));
    }


    return (
        <div>
            <Menu />
            <ToastContainer />

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
                    <Link className="admin1" to='/admin/service'><i class="fa fa-desktop"></i>Manage Event</Link>
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
                <Link className="admin1" to='/admin/service'><i class="fa fa-desktop"></i>Manage Event</Link>
                <Link className="admin1" to={`/profile/${isAuth()._id}`}><i class="fa fa-desktop"></i>Edit Profile</Link>
            </div>


            <div className="content1">
                <h1 className="addpro22">Total {products.length} products</h1>
                <ul className="addpro23">
                    {products.map((p, i) => {
                        return (
                            <li key={i} className="addpro24">
                                <hr />
                                <strong>{p.name}</strong>
                                <Link className="addpro26" to={`/admin/service/update/${p._id}`}>
                                    <span>update</span>
                                </Link>
                                <Button className="addpro25" onClick={() => deleteProducts(p._id)}>Delete</Button>
                                <hr />
                            </li>

                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ManageProducts;