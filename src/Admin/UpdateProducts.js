import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Menu from '../core/Menu'

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
        fakeprice: ' ',
        formData: '',
        active: '',
    })

    const { name, description, price, categories, category,
        shipping, quantity, formData, subcategories, fakeprice } = values;

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

        switch (name) {
            case 'photo':
                const phooto = e.target.files;
                for (let i = 0; i < phooto.length; i++) {
                    formData.append("photo", phooto[i]);
                }
                break;
            default:
                setValues({ ...values, [name]: e.target.value })
                formData.set(name, e.target.value);
                break;
        }
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
        <Fragment>
            <Menu />
            <Layout title='product' description='create Product' >
                <ToastContainer />
                <button onClick={loadsubCategory} className="addpro2">Load Subcategories</button>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Choose Images</Form.Label>
                        <Form.Control type="file" name='photo' multiple accept='image/*' onChange={handleChange('photo')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" value={name} onChange={handleChange('name')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Choose Categories</Form.Label><br />
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="4" placeholder="Enter Description" value={description} onChange={handleChange('description')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Actual Price</Form.Label>
                        <Form.Control type="number" placeholder="price" value={price} onChange={handleChange('price')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Fake Price</Form.Label>
                        <Form.Control type="number" placeholder="fake price" value={fakeprice} onChange={handleChange('fakeprice')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Choose Subcategy </Form.Label><br />
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
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={handleChange('quantity')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Shipping Available</Form.Label><br />
                        <select onChange={handleChange('shipping')} >
                            <option>Please Select</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Product Active status</Form.Label><br />
                        <select onChange={handleChange('active')} >
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
        </Fragment>
    );
}

export default UpdateProduct;