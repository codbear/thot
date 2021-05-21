import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { FormikBag, FormikValues, withFormik } from 'formik';

import { FormikTextField, isEmail, isRequired } from '../../../form';

import { AuthForm } from '../AuthForm';

interface LoginFormProps {
  handleSubmit:
    | ((event: FormEvent<HTMLFormElement>) => void)
    | ((values: FormikValues, formikBag: FormikBag<any, any>) => void | Promise<any>);
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const fields = {
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    inputProps: {
      autocomplete: 'username',
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
      autocomplete: 'current-password',
    },
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
    <AuthForm variant="login" handleSubmit={handleSubmit} error={formError}>
      <FormikTextField key={fields.email.name} {...fields.email} />
      <FormikTextField key={fields.password.name} {...fields.password} />
    </AuthForm>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  handleSubmit: (values) => {
    const { email: username, password } = values;

    signIn('credentials', {
      username,
      password,
      callbackUrl: window.location.origin,
    });
  },
})(LoginForm);
