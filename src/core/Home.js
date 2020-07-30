import React, {useState, useEffect} from "react";
import Layout from './Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import Card from './Card';
import Search from './Search'
 
const Home = () => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])

  const loadProductBySell = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/product?sortBy=sold&order=desc&limit=6`)
      .then(res => {
        setProductBySell(res.data);
      })
      .catch(err => {
        toast.error(`Server Error`,err);
      });

  }

  const loadProductByArrival = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/product?sortBy=createdAt&order=desc&limit=6`)
      .then(res => {
        setProductByArrival(res.data);
      })
      .catch(err => {
        toast.error(`Server Error`,err);
      });

  }

   useEffect(() => {
      loadProductByArrival()
      loadProductBySell()
   }, [])

  return (
    <Layout title='Advertisement page' description='Hello everyone Here all product according to new arrival and best sold product' className='container-fluid'>
    <ToastContainer />
    <Search />
    <h2 className='mb-4'>New Arrival</h2>
    <div className='row'>
    {productByArrival.map((product, i) => (<Card key={i} product={product}/>))}
    </div>

    <h2 className='mb-4'>Best seller</h2>
    <div className='row'>
    {productBySell.map((product, i) => (<Card key={i} product={product}/>))}
    </div>
    </Layout>
  );
}

export default Home;