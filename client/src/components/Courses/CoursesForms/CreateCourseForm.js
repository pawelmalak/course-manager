import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as courseActions from '../../../store/actions/course';
import * as authorActions from '../../../store/actions/author';

import Headline from '../../UI/Headline';
import Container from '../../UI/Container';
import Alert from '../../UI/Alert';

const CreateCourseForm = (props) => {
  const initialState = {
    name: '',
    author: null,
    url: '',
    tags: ''
  };

  const [formData, setFormData] = useState(initialState);

  const { fetchAuthors } = props;

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // Convert tags from string to array, trim whitespace and remove empty values
    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');

    // Send POST request
    props.postCourse({ ...formData, tags: tagsArray });

    // Reset form ?
    // setFormData({ ...initialState, author: formData.author });
  }

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Container>
      {props.errors && props.errors.map(e => <Alert alertType='danger'>{e}</Alert>)}
      <Headline title='Create new course' />
      <form onSubmit={e => formSubmitHandler(e)} className='mt-3'>
        {/* Course Name Input */}
        <div className='mb-3'>
          <label for='name' className='form-label'>Course name</label>
          <input
            type='text'
            className='form-control'
            placeholder='JavaScript Fullstack Course'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        {/* Course Author Select */}
        <div className='mb-3'>
          <label for='author' className='form-label'>
            Course author
          </label>
          <select
            className='form-select'
            id='author'
            name='author'
            required
            disabled={props.loading}
            value={formData.author}
            onChange={e => inputChangeHandler(e)}
          >
            <option selected value={null}>
              {props.loading
                ? 'Loading authors...'
                : 'Select author'
              }
            </option>
            {!props.loading && props.authors.map(a => <option value={a._id}>{a.name}</option>)}
          </select>
        </div>

        {/* Course URL Input */}
        <div className='mb-3'>
          <label for='url' className='form-label'>Course website</label>
          <input
            type='text'
            className='form-control'
            placeholder='https://'
            id='url'
            name='url'
            value={formData.url}
            onChange={e => inputChangeHandler(e)}
          />
        </div>

        {/* Course Tags Input */}
        <div className='mb-3'>
          <label for='tags' className='form-label'>Course tags</label>
          <input
            type='text'
            className='form-control'
            placeholder='javascript, react, node'
            id='tags'
            name='tags'
            value={formData.tags}
            onChange={e => inputChangeHandler(e)}
          />
        </div>
        
        <button type='submit' className='btn btn-dark float-end'>Create Course</button>
      </form>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    errors: state.course.errors,
    authors: state.author.authors,
    loading: state.author.loading,
    course: state.course.course
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCourse: (formData) => dispatch(courseActions.createCourse(formData)),
    fetchAuthors: () => dispatch(authorActions.getAuthors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseForm);