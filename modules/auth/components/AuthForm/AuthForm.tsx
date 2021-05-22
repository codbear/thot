import { FormEvent, ReactElement } from 'react';
import Link from 'next/link';

import { Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core';

import { Alert, ALERT_VARIANT } from '../../../ui';
import { Button } from '../../../form';

interface AuthFormProps {
  variant: 'login' | 'register';
  children: ReactElement | ReactElement[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: string;
  isProcessing: boolean;
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

const AuthForm = ({ variant, handleSubmit, error, children, isProcessing }: AuthFormProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
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
            isProcessing={isProcessing}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            {variant === 'login' ? 'Se connecter' : "S'inscrire"}
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
