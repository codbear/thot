import { Container, makeStyles } from '@material-ui/core';

import { RegisterForm } from '../components/RegisterForm';

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

const Register = () => {
  const classes = useStyles();

  return (
    <div className={classes.screen}>
      <Container className={classes.formContainer} maxWidth="sm">
        <RegisterForm />
      </Container>
    </div>
  );
};

export default Register;
