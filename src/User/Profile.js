import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import { isAuth, getCookie, updateUser } from '../helpers/auth';
import { Form, Button } from 'react-bootstrap'
import Love from '../images_icons/login.svg'
import Menu from '../core/Menu'
import {Helmet} from 'react-helmet'

const Profile = () => {

    const [values, setValues] = useState({
        name: '',
        password: '',
        error: '',
        email: '',
        street: '',
        state: "",
        city: '',
        phone: '',
        success: false
    })

    const { name, password, email, city, street, state, phone } = values

    const userId = isAuth()._id;
    const token = getCookie('token');

    const readProfile = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                setValues({
                    ...values, name: res.data.name, email: res.data.email,
                    city: res.data.Address.city, street: res.data.Address.street,
                    state: res.data.Address.state, phone: res.data.phone
                })
            })
            .catch(err => {
                console.error(err);
                setValues({ ...values, error: true })
            });
    }

    const updateProfile = (userId, token, email, password, name, street, city, state, phone) => {
        const user = { email, password, name, Address: { street, city, state }, phone }
        axios
            .put(`${process.env.REACT_APP_API_URL}/user/${userId}`,
                {
                    user
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            ).then((res) => {
                updateUser(res.data, () => {
                    setValues({
                        ...values,
                        name: res.data.name,
                        email: res.data.email,
                        success: true
                    })
                    alert('update done')
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        readProfile();
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        updateProfile(userId, token, email, password, name, street, city, state, phone);
    }

    return (
        <Fragment>
        <Helmet>
        <title>Edit {isAuth().name}</title>
        <meta name="description" content={isAuth().Address.street} />
        <meta name="author" content="Bunny Bash" />
        <meta name="robots" content="index, follow"></meta>
    </Helmet>
            <Menu />
            <div className="login">
                <div className="login1">
                    <div className="login11">
                        <h2>Update Profile.</h2>
                        <h2>Your Special Dates will turn those into</h2>
                        <h2 className="login113">Memories</h2>
                    </div>
                    <div className="login12">
                        <img src={Love} alt="love img" />
                    </div>
                </div>
                <div className="login2">
                    <div className="login22">
                        <Form onSubmit={clickSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={handleChange('name')} value={name} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" onChange={handleChange('street')} value={street} placeholder="Enter house number and street" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Pincode/City</Form.Label>
                                <Form.Control type="text" onChange={handleChange('city')} value={city} placeholder="Enter city and pincode" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" onChange={handleChange('state')} value={state} placeholder="Enter State" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" onChange={handleChange('phone')} value={phone} placeholder="Enter Phone number" />
                            </Form.Group>
                            <Button className="login25" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;