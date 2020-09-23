import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import { isAuth, getCookie, updateUser } from '../helpers/auth';
import { Form, Button } from 'react-bootstrap'
import Layout from '../core/Layout';
import Menu from '../core/Menu'

const Profile = (props) => {

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
                updateUser( res.data , () => {
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
            <Menu />
            <Layout title='Update Profile' description={`Hey ${name} want to update your profile `}>
                <Form onSubmit={clickSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={handleChange('name')} value={name} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={handleChange('email')} value={email} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" onChange={handleChange('street')} value={street} placeholder="Enter house number and street" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" onChange={handleChange('city')} value={city} placeholder="Enter city" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" onChange={handleChange('state')} value={state} placeholder="Enter State" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" onChange={handleChange('phone')} value={phone} placeholder="Enter Phone number" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Layout>
        </Fragment>
    );
}

export default Profile;