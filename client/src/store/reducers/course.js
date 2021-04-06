import * as actions from '../actions/actionTypes';

const initialState = {
  courses: [],
  course: null,
  loading: true,
  errors: []
};

const getCourses = (state, action) => {
  return {
    ...state,
    courses: action.courses,
    course: null,
    loading: false,
    errors: []
  }
}

const getCourse = (state, action) => {
  return {
    ...state,
    course: action.course,
    loading: false,
    errors: []
  }
}

const createCourseInit = (state, action) => {
  return {
    ...state,
    course: null,
    loading: true,
    errors: []
  }
}

const createCourse = (state, action) => {
  return {
    ...state,
    course: action.course,
    loading: false,
    errors: []
  }
}

const courseError = (state, action) => {
  return {
    ...state,
    loading: false,
    errors: action.errors,
    course: null
  }
}

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_COURSES: return getCourses(state, action);
    case actions.GET_COURSE: return getCourse(state, action);
    case actions.CREATE_COURSE_INIT: return createCourseInit(state, action);
    case actions.CREATE_COURSE: return createCourse(state, action);
    case actions.COURSE_ERROR: return courseError(state, action);
    default: return state;
  }
}

export default courseReducer;