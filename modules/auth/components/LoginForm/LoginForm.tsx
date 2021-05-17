import { FormEvent, useEffect, useState } from 'react';
import { signIn } from 'next-auth/client';
import { FormikBag, FormikValues, withFormik } from 'formik';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import { FormikTextField, isEmail, isRequired } from '../../../form';
import { Alert, ALERT_VARIANT } from '../../../ui';

type LoginFormProps = {
  handleSubmit:
    | ((event: FormEvent<HTMLFormElement>) => void)
    | ((values: FormikValues, formikBag: FormikBag<any, any>) => void | Promise<any>);
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: '100%',
    maxWidth: 600,
  },
  cardContent: {
    padding: spacing(5),
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: spacing(5),
  },
  fieldsContainer: {
    marginTop: spacing(5),
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

const getErrorMessage = (error) => {
  const errorMessages = {
    'Invalid credentials.': 'Votre email ou votre mot de passe est incorrect.',
    default: 'Une erreur est survenue.',
  };

  return errorMessages[error] || errorMessages.default;
};

const LoginForm = ({ handleSubmit, setFieldValue }: LoginFormProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (router.query.error) {
      const errorMessage = getErrorMessage(router.query.error);

      setFormError(errorMessage);
      setFieldValue('email', router.query.email);
    }
  }, [router, setFieldValue]);

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit as (event: FormEvent<HTMLFormElement>) => void}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" component="h1" className={classes.cardTitle}>
            Connexion
          </Typography>
          <Divider />
          <div className={classes.fieldsContainer}>
            <FormikTextField key={fields.email.name} {...fields.email} />
            <FormikTextField key={fields.password.name} {...fields.password} />
          </div>
          {formError && <Alert variant={ALERT_VARIANT.ERROR} content={formError} />}
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
