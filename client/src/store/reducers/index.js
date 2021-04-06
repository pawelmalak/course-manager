import { combineReducers } from 'redux';

import authorReducer from './author';
import courseReducer from './course';
import authReducer from './auth';
import userReducer from './user';
import dashboardReducer from './dashboard';

const rootReducer = combineReducers({
  author: authorReducer,
  course: courseReducer,
  auth: authReducer,
  user: userReducer,
  dashboard: dashboardReducer
});

export default rootReducer;