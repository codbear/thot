import cx from 'classnames';

import { makeStyles } from '@material-ui/core';

import { useLayoutConfig } from '../../services';

interface DefaultFooterProps {
  className?: string;
}

const defaultProps = {
  className: null,
};

const useStyles = makeStyles(({ breakpoints, palette, spacing, transitions }) => ({
  root: {
    borderTop: `1px solid ${palette.divider}`,
    padding: spacing(2),
    [breakpoints.up('sm')]: {
      padding: spacing(3),
    },
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}));

const DefaultFooter = ({ className, ...props }: DefaultFooterProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    navVariant,
    navWidth,
    isNavCollapsible,
    isNavCollapsed,
    collapsedNavWidth,
    shouldShrinkFooter,
    isNavOpen,
    navAnchor,
  } = layoutConfig;

  const navVariantToMargin = {
    persistent: isNavOpen ? navWidth : 0,
    permanent: isNavCollapsible && isNavCollapsed ? collapsedNavWidth : navWidth,
  };

  const marginLeft =
    navAnchor === 'left' || shouldShrinkFooter ? navVariantToMargin[navVariant] : 0;

  return (
    <footer
      {...props}
      className={cx(className, classes.root)}
      style={{
        marginLeft,
      }}
    />
  );
};

DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
