import { FormEvent } from 'react';
import { Button, Card, CardActions, CardContent, makeStyles } from '@material-ui/core';
import { FormikBag, FormikValues, withFormik } from 'formik';
import { FormikTextField } from '../../../form';
import { isEmail, isRequired } from '../../../form/services';

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
  handleSubmit: (values, formikBag) => {
    console.log({ values, formikBag });
  },
})(LoginForm);
