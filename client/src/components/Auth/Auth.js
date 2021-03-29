import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '../UI/Container';
import LoginForm from './LoginForm';
import RegisterFrom from './RegisterForm';
import Alert from '../UI/Alert';

const Auth = (props) => {
  const [loginMode, setLoginMode] = useState(true);

  if (props.isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Container>
      {props.error && <Alert alertType='danger'>{props.error}</Alert>}
      {loginMode
        ? <LoginForm switchMode={setLoginMode} />
        : <RegisterFrom switchMode={setLoginMode} />
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Auth);