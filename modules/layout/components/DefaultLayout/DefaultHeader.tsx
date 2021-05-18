import { ReactNode } from 'react';
import cx from 'classnames';

import { makeStyles, Toolbar, AppBar, IconButton } from '@material-ui/core';

import { LayoutConfig } from '../../constants';
import { useLayoutConfig } from '../../services';

interface DefaultHeaderProps {
  className?: string;
  children?: ReactNode;
  toolbarProps?: Record<string, any>;
  menuIcon?: { inactive: ReactNode; active: ReactNode };
}

const defaultProps = {
  className: '',
  toolbarProps: {},
  menuIcon: null,
  children: null,
};

const useStyles = makeStyles(({ transitions, zIndex }) => ({
  root: {
    zIndex: zIndex.appBar,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  clipped: {
    zIndex: zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: -8,
    marginRight: 8,
  },
}));

const createGet = (layoutConfig: LayoutConfig, normal, shrink, pushed, unsqueeze) => () => {
  const {
    isHeaderClipped,
    navAnchor,
    navVariant,
    isNavOpen,
    shouldSqueezeContent,
    isNavCollapsible,
    isNavCollapsed,
  } = layoutConfig;

  if (isHeaderClipped || navAnchor !== 'left') {
    return normal;
  }

  const fromNavVariant = {
    persistent: isNavOpen && (shouldSqueezeContent ? pushed : unsqueeze),
    permanent: isNavCollapsible && isNavCollapsed ? shrink : pushed,
  };

  return fromNavVariant[navVariant] || normal;
};

const DefaultHeader = ({
  className,
  menuIcon,
  children,
  toolbarProps,
  ...props
}: DefaultHeaderProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    isHeaderClipped,
    collapsedNavWidth,
    navWidth,
    navVariant,
    headerPosition,
    isNavOpen,
    setIsNavOpen,
  } = layoutConfig;

  const shouldRenderMenu = navVariant !== 'permanent' && !!menuIcon;

  const getWidth = createGet(
    layoutConfig,
    '100%',
    `calc(100% - ${collapsedNavWidth}px)`,
    `calc(100% - ${navWidth}px)`,
    '100%',
  );

  const getMargin = createGet(layoutConfig, 0, collapsedNavWidth, navWidth, navWidth);

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <AppBar
      color="primary"
      className={cx(className, classes.root, { [classes.clipped]: isHeaderClipped })}
      position={headerPosition}
      style={{
        width: getWidth(),
        marginLeft: getMargin(),
      }}
      {...props}
    >
      <Toolbar {...toolbarProps}>
        {shouldRenderMenu && (
          <IconButton onClick={handleClick} className={classes.menuButton}>
            {isNavOpen ? menuIcon.active : menuIcon.inactive || menuIcon.active}
          </IconButton>
        )}
        {children}
      </Toolbar>
    </AppBar>
  );
};

DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
