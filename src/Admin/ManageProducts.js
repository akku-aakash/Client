import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuth, getCookie} from '../helpers/auth';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
import {Link} from 'react-router-dom';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    
    const token = getCookie('token');
    const {_id} = isAuth();

    const getProducts = () => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/product?limit=undefined`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
          .then(res => setProducts(res.data))
          .catch(err => console.error(err));
    }

    useEffect(()=>{
        getProducts();
    },[getProducts()]);


    const deleteProducts =(productId) => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/product/${productId}/${_id}`,
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
        <Layout title='Manage Products' description = {`${isAuth().name} manage your products`}>
        <ToastContainer />
        <div>
        <h4>total {products.length} products</h4>
        <ul>
        {products.map((p,i) => {
            return(
                <li key={i}>
            <strong>{p.name}</strong>
            <Link to={`/admin/product/update/${p._id}`}>
            <span>update</span>
            </Link>
            <button onClick={() => deleteProducts(p._id)}>Delete</button>
            </li>
            )
        })}
        </ul>
        </div>
        </Layout>
    );
};

export default ManageProducts;