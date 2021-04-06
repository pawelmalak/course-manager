import * as actions from './actionTypes';
import axios from 'axios';

export const getCount = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/dashboard');

    dispatch({
      type: actions.GET_COUNT,
      count: res.data.data
    })
  } catch (err) {
    console.log(err)
  }
}