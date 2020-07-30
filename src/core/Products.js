import Layout from "./Layout";
import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const Products = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
        relatedProductFetch(productId)
    },[props])

    const loadSingleProduct = productId => {
         axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`)
         .then(res => {
            setProduct(res.data)
         })
         .catch(err => {
             setError(err.response.data.error)
         })
    }

    const relatedProductFetch = (productId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/related/${productId}`)
        .then(res => {
            setRelatedProduct(res.data);
        })
        .catch(err => {
            console.log(err.response.data.error)
        })
    }

    return (  
        <Layout title={product && product.name} 
        description={product && product.description && product.description.substring(0 , 100)}
        >
        <div>
        {
            product && product.description &&
            <Card product={product} showViewProductButthon ={false} /> 
        }
        </div>
        <div>
        <h3>Related products</h3>
        {
            relatedProduct.map((p,i) => (
                <Card key={i} product={p} /> 
                ))
        }
        </div>
        </Layout>  
    );
}

export default Products;