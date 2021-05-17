import { FormEvent } from 'react';
import { signIn } from 'next-auth/client';
import { FormikBag, FormikValues, withFormik } from 'formik';
import axios from 'axios';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';

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
  fieldsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: spacing(2),
  },
  marginBottom: {
    marginBottom: spacing(5),
  },
}));

const fields = {
  firstName: {
    name: 'firstName',
    type: 'text',
    label: 'Prénom',
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
  lastName: {
    name: 'lastName',
    type: 'text',
    label: 'Nom',
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
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
          <Typography variant="h4" component="h1" className={classes.cardTitle}>
            Inscription
          </Typography>
          <Divider />
          <div className={classes.fieldsContainer}>
            <div className={classes.fieldsRow}>
              <FormikTextField key={fields.firstName.name} {...fields.firstName} />
              <FormikTextField key={fields.lastName.name} {...fields.lastName} />
            </div>
            <FormikTextField key={fields.email.name} {...fields.email} />
            <FormikTextField key={fields.password.name} {...fields.password} />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            S&#39;inscrire
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }),
  handleSubmit: (values) => {
    const data = {
      username: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    };

    const authUrl =
      process.env.NEXT_PUBLIC_API_ROOT_URL + process.env.NEXT_PUBLIC_API_REGISTER_PATH;

    axios
      .post(authUrl, data, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        signIn('credentials', {
          username: values.email,
          password: values.password,
          callbackUrl: window.location.origin,
        });
      });
  },
})(LoginForm);
