import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/author';

import Headline from '../../UI/Headline';
import Container from '../../UI/Container';
import Alert from '../../UI/Alert';

const CreateAuthorForm = (props) => {
  const initialState = {
    name: '',
    website: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!props.loading && props.author) {
      // Clear form on success
      setFormData(initialState);
    }
  }, [props.author, props.loading]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Send POST request
    props.postAuthor(formData);
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
      {!props.loading && props.author &&
        <Alert alertType='success'>
          Author created: <Link to={`/authors/${props.author._id}`} className='text-decoration-none'>{props.author.name}</Link>
        </Alert>
      }

      <Headline title='Create new author' />
      <form onSubmit={e => formSubmitHandler(e)} className='mt-3'>
        {/* Author Name Input */}
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Author name</label>
          <input
            type='text'
            className='form-control'
            placeholder='John Doe'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        {/* Author Website Input */}
        <div className='mb-3'>
          <label htmlFor='url' className='form-label'>Author website</label>
          <input
            type='text'
            className='form-control'
            placeholder='https://'
            id='website'
            name='website'
            value={formData.website}
            onChange={e => inputChangeHandler(e)}
          />
        </div>
        
        <button type='submit' className='btn btn-dark float-end'>Create Author</button>
      </form>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    errors: state.author.errors,
    loading: state.author.loading,
    author: state.author.author
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postAuthor: (formData) => dispatch(actions.createAuthorInit(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuthorForm);