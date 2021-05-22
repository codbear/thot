import { FormEvent } from 'react';
import { signIn } from 'next-auth/client';
import { withFormik } from 'formik';
import axios from 'axios';

import { makeStyles } from '@material-ui/core';

import { FormikField, isEmail, isRequired } from '../../../form';

import { AuthForm } from '../AuthForm';

interface RegisterFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  fieldsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: spacing(2),
  },
}));

const fields = {
  firstName: {
    name: 'firstName',
    type: 'text',
    label: 'Prénom',
    inputProps: {
      autocomplete: 'given-name',
    },
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
  lastName: {
    name: 'lastName',
    type: 'text',
    label: 'Nom',
    inputProps: {
      autocomplete: 'family-name',
    },
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    inputProps: {
      autocomplete: 'email',
    },
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired, isEmail],
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Mot de passe',
    inputProps: {
      autocomplete: 'new-password',
    },
    required: true,
    fullWidth: true,
    noAsterisk: true,
    validators: [isRequired],
  },
};

const LoginForm = ({ handleSubmit, isSubmitting }: RegisterFormProps) => {
  const classes = useStyles();

  return (
    <AuthForm variant="register" handleSubmit={handleSubmit} isProcessing={isSubmitting}>
      <div className={classes.fieldsRow}>
        <FormikField key={fields.firstName.name} {...fields.firstName} />
        <FormikField key={fields.lastName.name} {...fields.lastName} />
      </div>
      <FormikField key={fields.email.name} {...fields.email} />
      <FormikField key={fields.password.name} {...fields.password} />
    </AuthForm>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }),
  handleSubmit: (values, { setFieldError, setSubmitting }) => {
    const { email: username, firstName, lastName, password } = values;

    const authUrl =
      process.env.NEXT_PUBLIC_API_ROOT_URL + process.env.NEXT_PUBLIC_API_REGISTER_PATH;

    axios
      .post(
        authUrl,
        { username, firstName, lastName, password },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        signIn('credentials', {
          username,
          password,
          callbackUrl: window.location.origin,
        });
      })
      .catch((error) => {
        const { status, data } = error.response;
        const isEmailAlreadyInUse = status === 409 && data === 'Email already exists';

        if (isEmailAlreadyInUse) {
          setFieldError('email', 'Cette adresse email est déjà utilisée.');
        }

        setSubmitting(false);
      });
  },
})(LoginForm);
