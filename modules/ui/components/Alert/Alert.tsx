import cx from 'classnames';

import { Typography, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/HelpOutline';
import ErrorIcon from '@material-ui/icons/HighlightOff';
import WarningIcon from '@material-ui/icons/ErrorOutline';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';

export const VARIANT = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

interface AlertProps {
  content: string;
  variant?: string;
  className?: string;
}

const defaultProps = {
  variant: VARIANT.INFO,
  className: '',
};

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    padding: spacing(2),
  },
  content: {
    marginLeft: spacing(2),
  },
  [VARIANT.INFO]: {
    backgroundColor: palette.info.main,
    color: palette.info.contrastText,
  },
  [VARIANT.WARNING]: {
    backgroundColor: palette.warning.main,
    color: palette.warning.contrastText,
  },
  [VARIANT.ERROR]: {
    backgroundColor: palette.error.main,
    color: palette.error.contrastText,
  },
  [VARIANT.SUCCESS]: {
    backgroundColor: palette.success.main,
    color: palette.success.contrastText,
  },
}));

const variantToIcon = {
  [VARIANT.INFO]: InfoIcon,
  [VARIANT.WARNING]: WarningIcon,
  [VARIANT.ERROR]: ErrorIcon,
  [VARIANT.SUCCESS]: SuccessIcon,
};

const Alert = ({ content, variant, className }: AlertProps) => {
  const classes = useStyles();
  const Icon = variantToIcon[variant];

  return (
    <div className={cx(className, classes.root, classes[variant])}>
      <Icon />
      <Typography variant="body1" component="div" className={classes.content}>
        {content}
      </Typography>
    </div>
  );
};

Alert.defaultProps = defaultProps;

export default Alert;
