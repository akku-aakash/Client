import React, { useState, Fragment, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Menu from '../core/Menu'
import { Link } from 'react-router-dom'

const AddCategory = () => {

    const [name, setName] = useState('');

    const token = getCookie('token');

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    }, [])

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log(token)
        if (name) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/sub/category/create/${isAuth()._id}`,
                    {
                        name
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                .then(res => {
                    setName({
                        name: ''
                    });
                    toast.success(res.data.message);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });

        }
        else {
            toast.error('Please fill the name');
        }
    }

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

            <ToastContainer />
            <div className="content">
                <div className="catt0">
                    <h1>Add Sub Category</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="catt">
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleChange} value={name} />
                        </Form.Group>
                        <Button className="login25" type="submit">
                            Create SubCategory
                </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;