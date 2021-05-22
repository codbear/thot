import { Button as MaterialButton, CircularProgress, Fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  progressWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Button = ({ isProcessing, children, ...otherProps }) => {
  const classes = useStyles();

  return (
    <MaterialButton disabled={isProcessing} {...otherProps}>
      <Fade in={isProcessing} unmountOnExit>
        <span className={classes.progressWrapper}>
          <CircularProgress size={24} />
        </span>
      </Fade>
      <Fade in={!isProcessing}>
        <span>{children}</span>
      </Fade>
    </MaterialButton>
  );
};

export default Button;
