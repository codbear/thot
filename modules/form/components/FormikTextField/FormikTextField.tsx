import { ReactNode } from 'react';
import { Field, FieldProps } from 'formik';

import { FormHelperText, makeStyles, TextField as MaterialTextField } from '@material-ui/core';

import { validateField, Validator } from '../../services';

type PropTypes = {
  name: string;
  validators?: Validator[];
  noAsterisk?: boolean;
  inputProps?: {};
};

const defaultProps = {
  validators: [],
  noAsterisk: false,
  inputProps: {},
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginBottom: spacing(2),
  },
  noAsterisk: {
    display: 'none',
  },
}));

const FormikTextField = ({
  name,
  validators,
  noAsterisk,
  inputProps,
  ...otherProps
}: PropTypes) => {
  const classes = useStyles();

  return (
    <Field name={name} validate={validateField(validators)}>
      {(formikProps: FieldProps): ReactNode => {
        const { form, field } = formikProps;
        const error = form.touched[field.name] && form.errors[field.name];

        return (
          <div className={classes.root}>
            <MaterialTextField
              id={`field${field.name}`}
              error={!!error}
              variant="outlined"
              InputLabelProps={{
                classes: {
                  ...(noAsterisk ? { asterisk: classes.noAsterisk } : {}),
                },
              }}
              inputProps={inputProps}
              {...field}
              {...formikProps}
              {...otherProps}
            />
            {error && (
              <FormHelperText id={`${field.name}error`} error>
                {error}
              </FormHelperText>
            )}
          </div>
        );
      }}
    </Field>
  );
};

FormikTextField.defaultProps = defaultProps;

export default FormikTextField;
