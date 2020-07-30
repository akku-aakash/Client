import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: ' ',
        quantity: '',
        photo: "",
        formData: '',
    })
    const { name, description, price, categories, category,
        shipping, quantity, formData } = values;

    const loadCategory = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/category`)
          .then(res => { 
             const {data} = res
            setValues({ ...values, categories:data, formData: new FormData()})
          })
          .catch(err => {
            toast.error(`Error To Your Information ${err.response.statusText}`);
          });
      };
    
    useEffect(() => {
        loadCategory();
    }, [])



    const token = getCookie('token');

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        setValues({ ...values, [name]: value })
        formData.set(name, value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/product/create/${isAuth()._id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: formData
        }).then(res => {
             res.json().then(ress=>{
                toast.success(ress.name);
                toast.error(ress.error);
                console.log(ress)
            });
        }).catch(err => {
            console.log(err);
            toast.error(err);
        })
    }

    return (
        <Layout title='product' description='create Product' >
            <ToastContainer />
            <h1>Add Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <input type="file" name='photo' accept='image/*' onChange={handleChange('photo')} />
                </Form.Group>
                <Form.Group >
                    <Form.Control type="text" placeholder="Name" value={name} onChange={handleChange('name')} />
                </Form.Group>
                <Form.Group >
                    <textarea type="text" placeholder="description" value={description} onChange={handleChange('description')} />
                </Form.Group>
                <Form.Group >
                    <Form.Control type="number" placeholder="price" value={price} onChange={handleChange('price')} />
                </Form.Group>
                <Form.Group >
                    <select onChange={handleChange('category')} >
                        <option>Please Select</option>
                        {categories && categories.map((c,i) => 
                            (<option key={i} value={c._id}>
                            {c.name} 
                            </option>)
                        )}
                    </select>
                </Form.Group>
                <Form.Group >
                    <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={handleChange('quantity')} />
                </Form.Group>
                <Form.Group >
                    <select onChange={handleChange('shipping')} >
                    <option>Please Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </Form.Group>
                <Button variant="danger" type="submit">
                    Create Product
                </Button>
            </Form>
        </Layout>
    );
}

export default AddProduct;