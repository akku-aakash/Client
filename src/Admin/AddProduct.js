import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import '../style/Addproduct.css'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import Menu from '../core/Menu'

const AddProduct = () => {
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
        photo: [],
        formData: '',
        descriptiona: [{ name: '' }],
        inclusive: [{ name: '' }],
        exclusive: [{ name: '' }],
        beforeyoubuy: [{ name: '' }],
    })
    const { name, description, price,
        categories, quantity, formData, category,
        subcategories, subCategory, descriptiona,
        inclusive, exclusive, beforeyoubuy} = values;

    const loadCategory = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/category`)
            .then(res => {
                const { data } = res
                setValues({ ...values, categories: data, formData: new FormData() })
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

    useEffect(() => {
        loadCategory();
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

    const handleSubmit = e => {

        e.preventDefault();

        if (isEmpty(description) || isEmpty(price) || isEmpty(quantity) || isEmpty(name) || isEmpty(subCategory) || isEmpty(category)) {
            toast.error('All fields required')
        }
        else if (!isLength(description, { min: 50, max: 1000 })) {
            toast.error('description must contain 50 words min ')
        }
        else {
            for (var i = 0; i < descriptiona.length; i++) {
                formData.append(`description${i}`, descriptiona[i].name)
            }
            for (var i = 0; i < inclusive.length; i++) {
                formData.append(`inclusive${i}`, inclusive[i].name)
            }
            for (var i = 0; i < exclusive.length; i++) {
                formData.append(`exclusive${i}`, exclusive[i].name)
            }
            for (var i = 0; i < beforeyoubuy.length; i++) {
                formData.append(`beforeyoubuy${i}`, beforeyoubuy[i].name)
            }

            fetch(`${process.env.REACT_APP_API_URL}/product/create/${isAuth()._id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }).then(res => {
                res.json().then(ress => {
                    if (ress.error) {
                        toast.error(ress.error.message)
                    }
                    else {
                        toast.success("product added successfully!!!");
                        formData.delete("photo")
                    }
                });
            }).catch(err => {
                console.log(err);
                toast.error(err);
            })
        }
        console.log(formData)
    }


    const handleShareholderNameChange = idx => evt => {
        const newShareholders = descriptiona.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });
        setValues({ ...values, descriptiona: newShareholders })
    };

    const handleAddShareholder = () => {
        setValues({ ...values, descriptiona: descriptiona.concat([{ name: "" }]) })
    };

    const handleinclusive = idx => evt => {
        const newShareholders = inclusive.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });
        setValues({ ...values, inclusive: newShareholders })
    };

    const handleinclusivearr = () => {
        setValues({ ...values, inclusive: inclusive.concat([{ name: "" }]) })
        console.log(values)
    };

    const hancleexclusive = idx => evt => {
        const newShareholders = exclusive.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });
        setValues({ ...values, exclusive: newShareholders })
    };

    const handleexclusivearr = () => {
        setValues({ ...values, exclusive: exclusive.concat([{ name: "" }]) })
        console.log(values)
    };

    const handlebeforeyou = idx => evt => {
        const newShareholders = beforeyoubuy.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });
        setValues({ ...values, beforeyoubuy: newShareholders })
    };

    const handlebeforeyouarr = () => {
        setValues({ ...values, beforeyoubuy: beforeyoubuy.concat([{ name: "" }]) })
        console.log(values)
    };


    return (
        <div className="addpro">
            <Menu />
            <ToastContainer />
            <div className="addpro1">
                <h1>Add Product</h1>

                <button onClick={loadsubCategory} className="addpro2">Load Subcategories</button>
                <p>Please Click on the load subcategories button before fill the entries of products.</p>
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
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="price" value={price} onChange={handleChange('price')} />
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


                    <Form.Label>Add description main points</Form.Label>
                    {descriptiona.map((shareholder, idx) => (
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder={`description ${idx + 1} `}
                                value={shareholder.name}
                                onChange={handleShareholderNameChange(idx)}
                            />
                        </Form.Group>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddShareholder}
                    >
                        Add More Points on Description
                </button><br /><br />


                    <Form.Label>Add Inclusive points</Form.Label>
                    {inclusive.map((shareholder, idx) => (
                        <div className="shareholder">
                            <Form.Control
                                type="text"
                                placeholder={`inclusive ${idx + 1} `}
                                value={shareholder.name}
                                onChange={handleinclusive(idx)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleinclusivearr}
                    >
                        Add More Points on inclusive
                </button><br /><br />

                    <Form.Label>Add Exclusive points</Form.Label>
                    {exclusive.map((shareholder, idx) => (
                        <div className="shareholder">
                            <Form.Control
                                type="text"
                                placeholder={`exclusive ${idx + 1} `}
                                value={shareholder.name}
                                onChange={hancleexclusive(idx)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleexclusivearr}
                    >
                        Add More Points on Exclusive
            </button><br /> <br />

                    <Form.Label>Add Before You Buy</Form.Label>
                    {beforeyoubuy.map((shareholder, idx) => (
                        <div className="shareholder">
                            <Form.Control
                                type="text"
                                placeholder={`before yoy buy ${idx + 1} `}
                                value={shareholder.name}
                                onChange={handlebeforeyou(idx)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handlebeforeyouarr}
                    >
                        Add Before You Buy
                     </button>
                    <br />
                    <br />
                    <br />
                    <Button variant="danger" type="submit">
                        Create Product
                </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;