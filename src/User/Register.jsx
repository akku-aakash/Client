import React, { useState, useEffect,Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import Menu from '../core/Menu'
import '../style/login.css'
import Reg from '../shimg/Sign Up.png'
import $ from 'jquery';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Register'
  });

  const { name, email, password1, password2 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  useEffect(() => {
    $(document).ready(function () {
        $(this).scrollTop(0);
    });
}, [])


  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });
            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              textChange: 'Sign Up'
            });
            toast.error(err.response);
            console.log(err);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <Fragment>
      <Menu />
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className="reg">
        <div className="reg1">
          <div className="reg12">
            <img src={Reg} alt="register image" />
          </div>
        </div>
        <div className="reg2">
          <div className="reg21">
            <h2><span>Sign Up</span> <span>| Sign In</span></h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group >
                <Form.Control type="text" placeholder="name" onChange={handleChange('name')} value={name} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="confirm Password" onChange={handleChange('password2')} value={password2} />
              </Form.Group>
              <Form.Group>
                <Form.Text className="text-muted" className="reg23">
                  <h6>Already have an account ?  <a href='/login' target='_self'><span>Sign In</span></a></h6>
                </Form.Text>
              </Form.Group>
              <Button className="reg22" type="submit">
                {formData.textChange}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;