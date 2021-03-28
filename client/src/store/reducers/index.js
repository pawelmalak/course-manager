import { combineReducers } from 'redux';

import authorReducer from './author';
import courseReducer from './course';

const rootReducer = combineReducers({
  author: authorReducer,
  course: courseReducer
});

export default rootReducer;