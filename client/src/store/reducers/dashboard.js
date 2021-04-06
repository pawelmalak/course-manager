import * as actions from '../actions/actionTypes';

const initialState = {
  loading: true,
  count: null
}

const getCount = (state, action) => {
  return {
    loading: false,
    count: action.count
  }
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_COUNT: return getCount(state, action);
    default: return state;
  }
}

export default dashboardReducer;