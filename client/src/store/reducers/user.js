import * as actions from '../actions/actionTypes';

const initialState = {
  user: null,
  users: [],
  loading: true,
  errors: []
}

const getUser = (state, action) => {
  return {
    ...state,
    user: action.user,
    loading: false
  }
}

const getUsers = (state, action) => {
  return {
    ...state,
    users: action.users,
    loading: false
  }
}

const createUserInit = (state, action) => {
  return {
    ...state,
    loading: true,
    user: null,
    errors: []
  }
}

const createUser = (state, action) => {
  return {
    ...state,
    loading: false,
    user: action.user,
    errors: []
  }
}

const userError = (state, action) => {
  return {
    ...state,
    loading: false,
    errors: action.errors,
    user: null
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER: return getUser(state, action);
    case actions.GET_USERS: return getUsers(state, action);
    case actions.CREATE_USER_INIT: return createUserInit(state, action);
    case actions.CREATE_USER: return createUser(state, action);
    case actions.USER_ERROR: return userError(state, action);
    default: return state;
  }
}

export default userReducer;