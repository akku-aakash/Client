import React, { useEffect } from 'react';
import { isAuth, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Menu from '../core/Menu'

const AdminDashboard = ({ history }) => {

    const { name, email } = isAuth();

    const handleLogout = () => {
        signout(() => {
            history.push('/');
        })
    }

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

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
                    <h4>{name}</h4>
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
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;
