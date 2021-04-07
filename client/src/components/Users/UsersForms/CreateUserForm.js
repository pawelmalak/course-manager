import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/user';

import Headline from '../../UI/Headline';
import Container from '../../UI/Container';
import Alert from '../../UI/Alert';

const CreateUserForm = (props) => {
  const initialState = {
    email: '',
    name: '',
    password: '',
    role: 'user'
  };

  const [formData, setFormData] = useState(initialState);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.postUser(formData);
  }

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Container>
      {/* Alerts */}
      {props.errors && props.errors.map((e, i) => <Alert alertType='danger' key={i}>{e}</Alert>)}
      {!props.loading && props.user &&
        <Alert alertType='success'>
          User created: {props.user.email} as {props.user.role}
        </Alert>
      }

      <Headline title='Create new user' link='/dashboard' />
      <form onSubmit={e => formSubmitHandler(e)} className='mt-3'>
        {/* User Email Input */}
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>User email</label>
          <input
            type='email'
            className='form-control'
            placeholder='name@example.com'
            id='email'
            name='email'
            required
            value={formData.email}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        {/* User Name Input */}
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Course name</label>
          <input
            type='text'
            className='form-control'
            placeholder='John'
            id='name'
            name='name'
            value={formData.name}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        {/* User Role Select */}
        <div className='mb-3'>
          <label htmlFor='role' className='form-label'>User role</label>
          <select
            className='form-select'
            id='role'
            name='role'
            value={formData.role}
            onChange={e => inputChangeHandler(e)}
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        {/* User Password Input */}
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>User password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            required
            value={formData.password}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        <button type='submit' className='btn btn-dark float-end'>Create User</button>
      </form>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    errors: state.user.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postUser: (formData) => dispatch(actions.createUserInit(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);