import * as actions from './actionTypes';
import axios from 'axios';

export const getAuthors = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/authors');

    dispatch({
      type: actions.GET_AUTHORS,
      authors: res.data.data
    });
  } catch (err) {
    dispatch({
      type: actions.AUTHOR_ERROR,
      errors: err.response.data.error.split(',')
    })
  }
}

export const getAuthor = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/authors/${id}`);
    
    dispatch({
      type: actions.GET_AUTHOR,
      author: res.data.data
    })
  } catch (err) {
    dispatch({
      type: actions.AUTHOR_ERROR,
      errors: err.response.data.error.split(',')
    })
  }
}

export const createAuthorInit = (formData) => async dispatch => {
  dispatch({ type: actions.CREATE_AUTHOR_INIT });
  dispatch(createAuthor(formData));
}

export const createAuthor = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/v1/authors', formData);

    dispatch({
      type: actions.CREATE_AUTHOR,
      author: res.data.data
    })
  } catch (err) {
    dispatch({
      type: actions.AUTHOR_ERROR,
      errors: err.response.data.error.split(',')
    })
  }
}