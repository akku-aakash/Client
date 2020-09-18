import React, { useState, useEffect, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import Layout from '../core/Layout';
import Menu from '../core/Menu'

const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: ''
  });
  const { password1, password2, token } = formData;

  useEffect(() => {
    let token = match.params.token
    if (token) {
      setFormData({ ...formData, token, })
    }

  }, [match.params])


  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {

      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
          newPassword: password1,
          resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
          setFormData({
            ...formData,
            password1: '',
            password2: ''
          });
          toast.success(res.data.message);

        })
        .catch(err => {
          toast.error('Something is wrong try again');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };


  return (
    <Fragment>
    <Menu />
    <Layout title='Reset Password' description='Enter Your Password'>
      <ToastContainer />
      <Form onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange('password2')} value={password2} />
        </Form.Group>
        <Button variant="danger" type="submit">
          Sign In
        </Button>
      </Form>
      </Layout>
      </Fragment>
  );
};

export default ResetPassword;