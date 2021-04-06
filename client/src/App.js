import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// Routes
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import Course from './components/Courses/Course';
import Authors from './components/Authors/Authors';
import Author from './components/Authors/Author';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Table from './components/UI/Table/Table';
import CreateCourseForm from './components/Courses/CoursesForms/CreateCourseForm';
import CreateAuthorForm from './components/Authors/AuthorsForms/CreateAuthorForm';

// Global auth
import { getUser } from './store/actions/auth';

// Check if token exists. Set is as axios header if it does
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const App = () => {
  useEffect(() => {
    store.dispatch(getUser());
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/courses/:id' component={Course} />
            <Route exact path='/authors' component={Authors} />
            <Route exact path='/authors/:id' component={Author} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create' component={CreateCourseForm} />
            <Route exact path='/dashboard/users' component={Table} />
            <Route exact path='/dashboard/authors' component={Table} />
            <Route exact path='/dashboard/courses/create' component={CreateCourseForm} />
            <Route exact path='/dashboard/authors/create' component={CreateAuthorForm} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;