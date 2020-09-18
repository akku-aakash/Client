import React from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Menu from '../core/Menu'

const AdminDashboard = () => {
    const { name, email, role } = isAuth();
    return (
        <div>
        <Menu />
        <Layout title='Admin Dashboard' description={`Hello ${name}`}>
                <div>
                    <ul>
                        <li><Link to='/create/category'>Create Category</Link></li>
                        <li><Link to='/create/sub/category'>Create subCategory</Link></li>
                        <li><Link to='/create/product'>Create Product</Link></li>
                        <li><Link to='/admin/orders'>Show Orders</Link></li>
                        <li><Link to='/admin/products'>Manage Products</Link></li>
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
            </Layout>
        </div>
    );
}

export default AdminDashboard;
