import * as actions from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token') || null,
  loading: true,
  isAuthenticated: false,
  user: null,
  error: null
};

const authSuccess = (state, action) => {
  localStorage.setItem('token', action.token);
  return {
    ...state,
    loading: false,
    isAuthenticated: true,
    token: action.token,
    error: null
  }
}

const authError = (state, action) => {
  localStorage.removeItem('token');
  return {
    ...state,
    loading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    error: action.error
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_ERROR: return authError(state, action);
    default: return state;
  }
}

export default authReducer;