import * as actions from '../actions/actionTypes';

const initialState = {
  authors: [],
  author: null,
  loading: true
};

const getAuthors = (state, action) => {
  return {
    ...state,
    authors: action.authors,
    author: null,
    loading: false
  }
}

const getAuthor = (state, action) => {
  return {
    ...state,
    author: action.author,
    loading: false
  }
}

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_AUTHORS: return getAuthors(state, action);
    case actions.GET_AUTHOR: return getAuthor(state, action);
    default: return state;
  }
}

export default authorReducer;