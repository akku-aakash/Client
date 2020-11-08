import React, { useState,useEffect ,Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import Menu from '../core/Menu'
import '../style/login.css'
import Love from '../images_icons/login.png'
import $ from 'jquery';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'SignIn'
  });
  const { email, password1 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'signin Successfully done'
            });
            console.log(isAuth());
            isAuth.role === 1 ? history.push('/admin/dashboard') : history.push('user/dashboard')
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error('Something went wrong');
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  useEffect(() => {
    $(document).ready(function () {
        $(this).scrollTop(0);
    });
}, [])


  return (
    <Fragment>
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      <Menu />
      <div className="login">
        <div className="login1">
          <div className="login12">
            <img src={Love} alt="love img" />
          </div>
        </div>
        <div className="login2">
          <div className="login22">
            <h2><span>Sign In</span> <span>| Sign Up</span></h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group >
                <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
              </Form.Group>
              <Form.Group >
                <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
              </Form.Group>
              <Form.Group className="login23">
                <Link className="login27" to='/users/password/forget'>Forget password?</Link>
              </Form.Group>
              <Form.Group className="login26">
                <Form.Text>
                  <h6>Don't have an account ?
                 <a href='/register' target='_self'>
                      <span className='ml-2'>Sign Up</span>
                    </a>
                  </h6>
                </Form.Text>
              </Form.Group>
              <Button className="login25" type="submit"> Log In</Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
