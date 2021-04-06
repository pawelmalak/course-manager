import * as actions from '../actions/actionTypes';

const initialState = {
  authors: [],
  author: null,
  loading: true,
  errors: []
};

const getAuthors = (state, action) => {
  return {
    ...state,
    authors: action.authors,
    author: null,
    loading: false,
    errors: []
  }
}

const getAuthor = (state, action) => {
  return {
    ...state,
    author: action.author,
    loading: false,
    errors: []
  }
}

const createAuthorInit = (state, action) => {
  return {
    ...state,
    author: null,
    loading: true,
    errors: []
  }
}

const createAuthor = (state, action) => {
  return {
    ...state,
    loading: false,
    author: action.author,
    errors: []
  }
}

const authorError = (state, action) => {
  return {
    ...state,
    loading: false,
    author: null,
    errors: action.errros
  }
}

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_AUTHORS: return getAuthors(state, action);
    case actions.GET_AUTHOR: return getAuthor(state, action);
    case actions.CREATE_AUTHOR_INIT: return createAuthorInit(state, action);
    case actions.CREATE_AUTHOR: return createAuthor(state, action);
    case actions.AUTHOR_ERROR: return authorError(state, action);
    default: return state;
  }
}

export default authorReducer;