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
    console.log(err);
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
    console.log(err);
  }
}