import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import Menu from '../core/Menu'
import '../style/login.css'
import Forgot from '../images_icons/resetpass.svg'

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });


  const { email } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {

          setFormData({
            ...formData,
            email: '',
          });
          toast.success(`Please check your email`);

        })
        .catch(err => {
          console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <Fragment>
      <ToastContainer />
      <Menu />
      <div className="reg">
        <div className="reg1">
          <div className="reg11">
            <h2>Forgot Password</h2>
          </div>
          <div className="reg12">
            <img src={Forgot} alt="forgot password pic" />
          </div>
        </div>
        <div className="reg2">
          <div className="reg21">
            <h2>Enter Your Email</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
              </Form.Group>
              <Button className="reg22" type="submit"> Submit </Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;