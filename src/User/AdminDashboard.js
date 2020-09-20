import React from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Menu from '../core/Menu'

const AdminDashboard = () => {
    const { name, email } = isAuth();
    return (
        <div>
            <Menu />
            <div className="addmin">
                <div className="admin">
                    <ul>
                        <li><Link className="admin1" to='/admin/dashboard'>Dashboard</Link></li>
                        <li><Link className="admin1" to='/create/category'>Create Category</Link></li>
                        <li><Link className="admin1" to='/create/sub/category'>Create subCategory</Link></li>
                        <li><Link className="admin1" to='/create/product'>Create Product</Link></li>
                        <li><Link className="admin1" to='/admin/orders'>Show Orders</Link></li>
                        <li><Link className="admin1" to='/admin/products'>Manage Products</Link></li>
                        <li><Link className="admin1" to={`/profile/${isAuth()._id}`}>Edit Profile</Link></li>
                    </ul>
                </div>
                <div className="admin2">
                    <div className="admin3">
                        <ul>
                            <li>{name}</li>
                            <li>{email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
