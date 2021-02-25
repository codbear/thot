import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldProps } from 'formik';
import TextField from '../TextField/TextField';
import { validateField, Validator } from '../../services';

const propTypes = {
  name: PropTypes.string.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func),
};

const defaultProps = {
  validators: [],
};

const FormikTextField = ({
  name, validators, ...otherProps
}: { name: string, validators: Validator[] }) => (
  <Field name={name} validate={validateField(validators)}>
    {(formikProps: FieldProps): React.ReactNode => (
      // @ts-ignore
      <TextField
        {...formikProps}
        {...otherProps}
      />
    )}
  </Field>
);

FormikTextField.propTypes = propTypes;
FormikTextField.defaultProps = defaultProps;

export default FormikTextField;
