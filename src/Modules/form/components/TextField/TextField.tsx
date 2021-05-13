import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, makeStyles, TextField as MaterialTextField } from '@material-ui/core';

const propTypes = {
  form: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    touched: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object,
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
  }).isRequired,
  onBlur: PropTypes.func,
  noAsterisk: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: PropTypes.object,
};

const defaultProps = {
  onBlur() {},
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

const TextField = ({
// @ts-ignore
  form, field, onBlur, noAsterisk, inputProps, ...otherProps
}) => {
  const classes = useStyles();
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
        InputProps={{
          onBlur: (event) => {
            field.onBlur(event);
            onBlur(event.target.value);
          },
          ...inputProps,
        }}
        {...field}
        {...otherProps}
      />
      {error && (
        <FormHelperText id={`${field.name}error`} error>{ error }</FormHelperText>
      )}
    </div>
  );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
