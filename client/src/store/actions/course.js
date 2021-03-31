import * as actions from './actionTypes';
import axios from 'axios';

export const getCourses = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/courses');

    dispatch({
      type: actions.GET_COURSES,
      courses: res.data.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const getCourse = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/courses/${id}`);

    dispatch({
      type: actions.GET_COURSE,
      course: res.data.data
    });
  } catch (err) {
    dispatch({
      type: actions.COURSE_ERROR,
      errors: err
    })
  }
}