import React, { useState } from 'react';

import Container from '../UI/Container';
import LoginForm from './LoginForm';
import RegisterFrom from './RegisterForm';

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true);

  return (
    <Container>
      {loginMode
        ? <LoginForm switchMode={setLoginMode} />
        : <RegisterFrom switchMode={setLoginMode} />
      }
    </Container>
  )
}

export default Auth;