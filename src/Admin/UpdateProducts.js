import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        subcategories: [],
        subCategory: '',
        shipping: ' ',
        quantity: '',
        photo: "",
        formData: '',
    })

    const { name, description, price, categories, category,
        shipping, quantity, formData,subcategories } = values;

    const loadCategory = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/category`)
            .then(res => {
                const { data } = res
                setValues({ categories: data, formData: new FormData() })
            })
            .catch(err => {
                toast.error(`Error To Your Information ${err.response.statusText}`);
            });
    };

    const loadsubCategory = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/sub/category`)
            .then(res => {
                setValues({ ...values, subcategories: res.data });
            })
            .catch(err => {
                toast.error(`Error To Your Information ${err.response.statusText}`);
            });
    }

    const getSingleProduct = (productId) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            .then(res => {
                loadCategory()
                setValues({
                    ...values,
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    category: res.data.category._id,
                    shipping: res.data.shipping,
                    quantity: res.data.quantity,
                    formData: new FormData()
                })
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getSingleProduct(match.params.productId);
    }, [])


    const token = getCookie('token');

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        setValues({ ...values, [name]: value })
        formData.set(name, value);
    }

    const updateProducts = (productId, formData) => {

        fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/${isAuth()._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'applicaiton/json',
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(res => res.json().then((data) => {
                console.log(data);
                toast('done!!!')
            }))
            .catch(err => console.error(err));
    }

    const handleSubmit = e => {
        e.preventDefault();
        updateProducts(match.params.productId, formData)
    }

    return (
        <Layout title='product' description='create Product' >
            <ToastContainer />
            <h1>Add Product</h1>
            <button onClick={loadsubCategory}>subcategories</button>
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
                        {categories && categories.map((c, i) =>
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
                    <select onChange={handleChange('subCategory')} >
                        <option>Please Select</option>
                        {subcategories && subcategories.map((f, i) =>
                            (<option key={i} value={f._id}>
                                {f.name}
                            </option>)
                        )}
                    </select>
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

export default UpdateProduct;