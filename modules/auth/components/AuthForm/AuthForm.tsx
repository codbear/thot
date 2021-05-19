import { FormEvent, ReactElement } from 'react';
import Link from 'next/link';
import { FormikBag, FormikValues } from 'formik';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Alert, ALERT_VARIANT } from '../../../ui';

interface AuthFormProps {
  variant: 'login' | 'register';
  children: ReactElement | ReactElement[];
  handleSubmit:
    | ((event: FormEvent<HTMLFormElement>) => void)
    | ((values: FormikValues, formikBag: FormikBag<any, any>) => void | Promise<any>);
  error?: string;
}

const defaultProps = {
  error: null,
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
  cardActions: {
    flexDirection: 'column',
  },
  submitButton: {
    marginBottom: spacing(3),
  },
}));

const AuthForm = ({ variant, handleSubmit, error, children }: AuthFormProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit as (event: FormEvent<HTMLFormElement>) => void}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" component="h1" className={classes.cardTitle}>
            {variant === 'login' ? 'Connexion' : 'Inscription'}
          </Typography>
          <Divider />
          <div className={classes.fieldsContainer}>{children}</div>
          {error && <Alert variant={ALERT_VARIANT.ERROR} content={error} />}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            {variant === 'login' ? 'Se connecter' : 'S&#39;inscrire'}
          </Button>
          {variant === 'login' ? (
            <Typography variant="body2">
              Vous n&#39;avez pas encore de compte ?{' '}
              <Link href="/register">
                <a>Inscrivez-vous gratuitement</a>
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              Vous avez déjà un compte ?{' '}
              <Link href="/login">
                <a>Connectez-vous</a>
              </Link>
            </Typography>
          )}
        </CardActions>
      </form>
    </Card>
  );
};

AuthForm.defaultProps = defaultProps;

export default AuthForm;
