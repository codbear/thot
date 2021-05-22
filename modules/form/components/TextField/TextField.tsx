import cx from 'classnames';
import { FormikErrors } from 'formik';

import { FormHelperText, makeStyles, TextField as MaterialTextField } from '@material-ui/core';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

interface TextFieldProps {
  field: Record<string, any>;
  className?: string;
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  noAsterisk?: boolean;
  type?: string;
  InputProps?: Partial<OutlinedInputProps>;
}

const defaultProps = {
  className: null,
  error: null,
  noAsterisk: false,
  type: 'text',
  InputProps: null,
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginBottom: spacing(2),
  },
  noAsterisk: {
    display: 'none',
  },
}));

const TextField = ({
  field,
  className,
  error,
  noAsterisk,
  type,
  InputProps,
  ...otherProps
}: TextFieldProps) => {
  const classes = useStyles();

  return (
    <div className={cx(className, classes.root)}>
      <MaterialTextField
        id={`field${field.name}`}
        error={!!error}
        variant="outlined"
        type={type}
        InputProps={InputProps}
        InputLabelProps={{
          classes: {
            ...(noAsterisk ? { asterisk: classes.noAsterisk } : {}),
          },
        }}
        {...otherProps}
      />
      {error && (
        <FormHelperText id={`${field.name}error`} error>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

TextField.defaultProps = defaultProps;

export default TextField;
