import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/auth';

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
    props.loginUser(formData);
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

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (formData) => dispatch(actions.loginUser(formData))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);