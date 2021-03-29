import * as actions from './actionTypes';
import axios from 'axios';

export const loginUser = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/v1/auth/login', formData);

    dispatch({
      type: actions.AUTH_SUCCESS,
      token: res.data.token
    });

    dispatch(getUser());
  } catch (err) {
    dispatch({
      type: actions.AUTH_ERROR,
      error: err.response.data.error
    })
  }
}

export const getUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: actions.GET_USER,
      user: res.data.data
    })
  } catch (err) {
    dispatch({
      type: actions.AUTH_ERROR
    })
  }
}