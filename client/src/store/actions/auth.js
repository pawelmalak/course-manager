import * as actions from './actionTypes';
import axios from 'axios';

export const loginUser = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/v1/auth/login', formData);

    dispatch({
      type: actions.AUTH_SUCCESS,
      token: res.data.token
    })
  } catch (err) {
    dispatch({
      type: actions.AUTH_ERROR,
      error: err.response.data.error
    })
  }
}