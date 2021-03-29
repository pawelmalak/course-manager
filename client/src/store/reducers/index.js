import { combineReducers } from 'redux';

import authorReducer from './author';
import courseReducer from './course';
import authReducer from './auth';

const rootReducer = combineReducers({
  author: authorReducer,
  course: courseReducer,
  auth: authReducer
});

export default rootReducer;