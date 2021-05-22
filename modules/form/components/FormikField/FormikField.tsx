import { FormikPasswordField } from '../FormikPasswordField';
import { FormikTextField } from '../FormikTextField';

interface FormikFieldProps {
  name: string;
  type: string;
}

const FormikField = ({ name, type, ...otherProps }: FormikFieldProps) => {
  const propsBag = {
    name,
    type,
    ...otherProps,
  };

  if (type === 'password') {
    return <FormikPasswordField {...propsBag} />;
  }

  return <FormikTextField {...propsBag} />;
};

export default FormikField;
