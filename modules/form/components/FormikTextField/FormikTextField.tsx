import { ReactNode } from 'react';
import { Field, FieldProps } from 'formik';

import { validateField, Validator } from '../../services';

import { TextField } from '../TextField';

type PropTypes = {
  name: string;
  validators?: Validator[];
};

const defaultProps = {
  validators: [],
};

const FormikTextField = ({ name, validators, ...otherProps }: PropTypes) => {
  return (
    <Field name={name} validate={validateField(validators)}>
      {(formikProps: FieldProps): ReactNode => {
        const { form, field } = formikProps;
        const error = form.touched[field.name] && form.errors[field.name];

        return (
          <TextField field={field} error={error} {...field} {...formikProps} {...otherProps} />
        );
      }}
    </Field>
  );
};

FormikTextField.defaultProps = defaultProps;

export default FormikTextField;
