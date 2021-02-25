import React from 'react';

import { Container, makeStyles } from '@material-ui/core';

import LoginForm from '../components/LoginForm';

const useStyles = makeStyles({
  screen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const LoginScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.screen}>
      <Container
        className={classes.formContainer}
        maxWidth="sm"
      >
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginScreen;
