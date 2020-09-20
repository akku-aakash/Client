import React, { useState, useEffect, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Menu from '../core/Menu'
import '../style/login.css'
import Forgot from '../images_icons/resetpass.svg'

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
      <ToastContainer />
      <div className="reg">
        <div className="reg1">
          <div className="reg11">
            <h2>Reset Password</h2>
          </div>
          <div className="reg12">
            <img src={Forgot} alt="reset password pic" />
          </div>
        </div>
        <div className="reg2">
          <div className="reg21">
            <h2>Enter Your Passwords</h2>
            <Form onSubmit={handleSubmit} >
              <Form.Group>
                <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange('password2')} value={password2} />
              </Form.Group>
              <Button className="reg22" type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;