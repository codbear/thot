import cx from 'classnames';

import { makeStyles } from '@material-ui/core';

import { useLayoutConfig } from '../../services';

interface DefaultContentProps {
  className?: string;
}

const defaultProps = {
  className: null,
};

const useStyles = makeStyles(({ transitions, spacing }) => ({
  root: {
    padding: spacing(2),
    flexGrow: 1,
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}));

const Content = ({ className, ...props }: DefaultContentProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    hasNav,
    navVariant,
    navWidth,
    isNavCollapsible,
    isNavCollapsed,
    collapsedNavWidth,
    isNavOpen,
    navAnchor,
    shouldSqueezeContent,
  } = layoutConfig;

  const navVariantToMargin = {
    persistent: isNavOpen ? navWidth : 0,
    permanent: isNavCollapsible && isNavCollapsed ? collapsedNavWidth : navWidth,
  };

  const marginLeft = hasNav && navAnchor === 'left' ? navVariantToMargin[navVariant] : 0;

  const width = navVariant === 'persistent' && isNavOpen && !shouldSqueezeContent ? '100%' : 'auto';

  return (
    <main
      {...props}
      className={cx(className, classes.root)}
      style={{
        marginLeft,
        width,
      }}
    />
  );
};

Content.defaultProps = defaultProps;

export default Content;
