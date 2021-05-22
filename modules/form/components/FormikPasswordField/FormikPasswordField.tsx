import { ReactNode, useState } from 'react';
import { Field, FieldProps } from 'formik';

import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

import { validateField, Validator } from '../../services';

import { TextField } from '../TextField';

type PropTypes = {
  name: string;
  validators?: Validator[];
  InputProps?: Partial<OutlinedInputProps>;
};

const defaultProps = {
  validators: [],
  InputProps: null,
};

const FormikPasswordField = ({ name, validators, InputProps, ...otherProps }: PropTypes) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleClickOnShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClickOnShowPassword}>
        {isPasswordHidden ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Field name={name} validate={validateField(validators)}>
      {(formikProps: FieldProps): ReactNode => {
        const { form, field } = formikProps;
        const error = form.touched[field.name] && form.errors[field.name];

        return (
          <TextField
            field={field}
            error={error}
            InputProps={{ ...InputProps, endAdornment }}
            {...field}
            {...formikProps}
            {...otherProps}
            type={isPasswordHidden ? 'password' : 'text'}
          />
        );
      }}
    </Field>
  );
};

FormikPasswordField.defaultProps = defaultProps;

export default FormikPasswordField;
