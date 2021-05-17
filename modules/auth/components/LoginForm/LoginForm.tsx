import { FormEvent } from 'react';
import { signIn } from 'next-auth/client';
import { FormikBag, FormikValues, withFormik } from 'formik';

import { Button, Card, CardActions, CardContent, makeStyles } from '@material-ui/core';

import { FormikTextField, isEmail, isRequired } from '../../../form';

type LoginFormProps = {
  handleSubmit:
    | ((event: FormEvent<HTMLFormElement>) => void)
    | ((values: FormikValues, formikBag: FormikBag<any, any>) => void | Promise<any>);
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: '100%',
    maxWidth: 600,
  },
  cardContent: {
    padding: spacing(5),
  },
  marginBottom: {
    marginBottom: spacing(5),
  },
}));

const fields = {
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired, isEmail],
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Mot de passe',
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
};

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit as (event: FormEvent<HTMLFormElement>) => void}>
        <CardContent className={classes.cardContent}>
          <FormikTextField key={fields.email.name} {...fields.email} />
          <FormikTextField key={fields.password.name} {...fields.password} />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Se connecter
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  handleSubmit: (values) => {
    signIn('credentials', {
      username: values.email,
      password: values.password,
      callbackUrl: window.location.origin,
    });
  },
})(LoginForm);
