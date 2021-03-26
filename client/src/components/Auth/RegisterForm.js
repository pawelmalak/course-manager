import React, { Fragment, useState } from 'react';

import Headline from '../UI/Headline';

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
  }

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  return (
    <Fragment>
      <Headline title='Register' subtitle='Create new account' />
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
        <div className='my-3'>
          <label htmlFor='input-name' className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            id='input-name'
            name='name'
            placeholder='John'
            value={formData.name}
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
            onClick={() => props.switchMode(true)}
          >Switch to signup</button>
          <button type='submit' className='btn btn-dark'>Login</button>
        </div>
      </form>
    </Fragment>
  )
}

export default RegisterForm;