import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Activate from './User/Activate';
import Login from './User/Login';
import Register from './User/Register';
import ForgetPassword from './User/ForgetPassword';
import ResetPassword from './User/ResetPassword';
import Profile from './User/Profile';
import Dashboard from './User/UserDashboard';
import AdminDashboard from './User/AdminDashboard';

import PrivateRoute from './helpers/PrivateRoute';
import AdminRoute from './helpers/AdminRoute';

import Order from './Admin/Order';
import AddCategory from './Admin/AddCategory';
import AddSubCategory from './Admin/AddSubcategory';
import AddProduct from './Admin/AddProduct';
import Events from './Admin/AddEvents';
import ManageProduct from './Admin/ManageProducts';
import UpdateProduct from './Admin/UpdateProducts';
import ManageServ from './Admin/ManageServ';
import UpdateServ from './Admin/UpdateServ';

import CategoryPro from './core/CategoryPro';
import Products from './core/Products';
import Cart from './core/Cart';
import Home from './core/Home';
import Diykit from './homeCore/Diykits';
import Exp from './homeCore/Experience';
import Special from './homeCore/SpecialSer';
import Unique from './homeCore/Unique';
import Footer from './core/Footer';
import ErrorPage from './homeCore/ErrorPage';
import Speciall from './homeCore/SpecialService';
import Store from './homeCore/Store';
import School from './homeCore/School';
import CopEvent from './homeCore/CopEvent';
import CopWork from './homeCore/CopWork';
import Service from './core/Service'
import Servicepro from './Service/CategoryPro'

const Routes = () => {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact render={props => <Home {...props} />} />
                    <Route path='/register' exact render={props => <Register {...props} />} />
                    <Route path='/login' exact render={props => <Login {...props} />} />
                    <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
                    <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
                    <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
                    <Route path='/products/diykit' exact render={props => <Diykit {...props} />} />
                    <Route path='/products/experience' exact render={props => <Exp {...props} />} />
                    <Route path='/products/special/services' exact render={props => <Special {...props} />} />
                    <Route path='/products/unique/gifts' exact render={props => <Unique {...props} />} />
                    <Route path='/special/services' exact render={props => <Speciall {...props} />} />
                    <Route path='/special/services/scholl/event' exact render={props => <School {...props} />} />
                    <Route path='/special/services/corporate/event' exact render={props => <CopEvent {...props} />} />
                    <Route path='/special/services/corporate/workshop' exact render={props => <CopWork {...props} />} />
                    <Route path='/special/services/store/launch' exact render={props => <Store {...props} />} />

                    <Route path='/product/:productId' exact component={Products} />
                    <Route path='/products/subCategory/:productId' exact component={CategoryPro} />
                    <Route path='/service/:productId/:city' exact component={Service} />
                    <Route path='/service/subCategory/:productId' exact component={Servicepro} />
                    <Route path='/cart' exact component={Cart} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/create/category' exact component={AddCategory} />
                    <AdminRoute path='/create/sub/category' exact component={AddSubCategory} />
                    <AdminRoute path='/create/product' exact component={AddProduct} />
                    <AdminRoute path='/create/events' exact component={Events} />
                    <AdminRoute path='/admin/orders' exact component={Order} />
                    <AdminRoute path='/admin/products' exact component={ManageProduct} />
                    <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct} />
                    <PrivateRoute path='/profile/:userId' exact component={Profile} />
                    <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                    <AdminRoute path='/admin/service' exact component={ManageServ} />
                    <AdminRoute path='/admin/service/update/:productId' exact component={UpdateServ} />
                    <Route component={ErrorPage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default Routes;