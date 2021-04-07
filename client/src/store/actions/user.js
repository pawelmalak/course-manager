import * as actions from './actionTypes';
import axios from 'axios';

export const getUser = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/users/${id}`);

    dispatch({
      type: actions.GET_USER,
      user: res.data.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/users');

    dispatch({
      type: actions.GET_USERS,
      users: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export const createUserInit = (formData) => async dispatch => {
  dispatch({ type: actions.CREATE_USER_INIT });
  dispatch(createUser(formData));
}

export const createUser = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/v1/users', formData);

    dispatch({
      type: actions.CREATE_USER,
      user: res.data.data
    })
  } catch (err) {
    dispatch({
      type: actions.USER_ERROR,
      errors: err.response.data.error.split(',')
    })
  }
}