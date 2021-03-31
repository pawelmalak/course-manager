import * as actions from '../actions/actionTypes';

const initialState = {
  courses: [],
  course: null,
  loading: false,
  errors: []
};

const getCourses = (state, action) => {
  return {
    ...state,
    courses: action.courses,
    course: null,
    loading: false
  }
}

const getCourse = (state, action) => {
  return {
    ...state,
    course: action.course,
    loading: false
  }
}

const courseError = (state, action) => {
  return {
    ...state,
    loading: false,
    errors: action.errors
  }
}

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_COURSES: return getCourses(state, action);
    case actions.GET_COURSE: return getCourse(state, action);
    case actions.COURSE_ERROR: return courseError(state, action);
    default: return state;
  }
}

export default courseReducer;