import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Menu from '../core/Menu'
import { Link } from 'react-router-dom'

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        subcategories: [],
        subCategory: '',
        Semail: '',
        photo: "",
        fakeprice: ' ',
        formData: '',
        active: '',
    })

    const { name, description, price, categories, category,
        Semail, formData, subcategories, fakeprice } = values;

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
            .get(`${process.env.REACT_APP_API_URL}/service/${productId}`)
            .then(res => {
                loadCategory()
                setValues({
                    ...values,
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    category: res.data.category._id,
                    shipping: res.data.shipping,
                    Semail: res.data.Semail,
                    fakeprice : res.data.fakeprice,
                    formData: new FormData()
                })
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getSingleProduct(match.params.productId);
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    }, [])

    useEffect(() => {
        loadsubCategory()
    },[categories])


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

        fetch(`${process.env.REACT_APP_API_URL}/service/${productId}/${isAuth()._id}`, {
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
        <div>
            <Menu />
            <ToastContainer />

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
                    <Link className="admin1" to='/admin/service'><i class="fa fa-desktop"></i>Manage Event</Link>
                    <Link className="admin1" to={`/profile/${isAuth()._id}`}><i class="fa fa-desktop"></i>Edit Profile</Link>
                </div>
            </div>

            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg`} class="profile_image" alt="" />
                    <h4>{isAuth().name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>Create Category</Link>
                <Link className="admin1" to='/create/sub/category'><i class="fa fa-desktop"></i>Create subCategory</Link>
                <Link className="admin1" to='/create/product'><i class="fa fa-desktop"></i>Create Product</Link>
                <Link className="admin1" to='/create/events'><i class="fa fa-desktop"></i>Create Event</Link>
                <Link className="admin1" to='/admin/orders'><i class="fa fa-desktop"></i>Show Orders</Link>
                <Link className="admin1" to='/admin/products'><i class="fa fa-desktop"></i>Manage Products</Link>
                <Link className="admin1" to='/admin/service'><i class="fa fa-desktop"></i>Manage Event</Link>
                <Link className="admin1" to={`/profile/${isAuth()._id}`}><i class="fa fa-desktop"></i>Edit Profile</Link>
            </div>

            <div className="content1">
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
                        <Form.Label>Sales Price</Form.Label>
                        <Form.Control type="number" placeholder="Sales price" value={price} onChange={handleChange('price')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Actual Price</Form.Label>
                        <Form.Control type="number" placeholder="Actual price" value={fakeprice} onChange={handleChange('fakeprice')} />
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
                        <Form.Label>Service Email</Form.Label>
                        <Form.Control type="email" placeholder="Service Email" value={Semail} onChange={handleChange('Semail')} />
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
                        Update Service
                </Button>
                </Form>
            </div>
        </div>
    );
}

export default UpdateProduct;