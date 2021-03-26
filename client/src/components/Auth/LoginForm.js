import React, { Fragment, useState } from 'react';
import axios from 'axios';

import Headline from '../UI/Headline';
import Alert from '../UI/Alert';

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/v1/auth/login', formData)
      .then(res => console.log(res))
      .catch(err => setErrors([err.response.data.error]));
  }

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Fragment>
      {errors.length > 0 && errors.map((e, i) => (
        <Alert key={i} alertType='danger'>{e}</Alert>
      ))}
      <Headline title='Login' subtitle='Login as existing user' />
      <form onSubmit={e => formSubmitHandler(e)}>
        <div className='my-3'>
          <label htmlFor='input-email' className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='input-email'
            name='email'
            placeholder='name@example.com'
            value={formData.email}
            onChange={e => inputChangeHandler(e)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='input-password' className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            id='input-password'
            name='password'
            value={formData.password}
            onChange={e => inputChangeHandler(e)}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type='button'
            className='btn btn-outline-dark me-3'
            onClick={() => props.switchMode(false)}
          >Switch to signup</button>
          <button type='submit' className='btn btn-dark'>Login</button>
        </div>
      </form>
    </Fragment>
  )
}

export default LoginForm;