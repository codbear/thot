import { ReactNode } from 'react';
import { signOut } from 'next-auth/client';
import cx from 'classnames';

import { makeStyles, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import SignOutIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useLayoutConfig } from '../../services';
import { LayoutConfig } from '../../constants';

interface DefaultHeaderProps {
  className?: string;
  children?: ReactNode;
  toolbarProps?: Record<string, any>;
}

const defaultProps = {
  className: '',
  toolbarProps: {},
  children: null,
};

const useStyles = makeStyles(({ transitions, zIndex, spacing }) => ({
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
  title: {
    textTransform: 'uppercase',
    flexGrow: 1,
  },
  signOutIcon: {
    marginRight: spacing(2),
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

const Header = ({ className, children, toolbarProps, ...props }: DefaultHeaderProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    layoutSource,
    hasNav,
    isHeaderClipped,
    collapsedNavWidth,
    navWidth,
    navVariant,
    headerPosition,
    isNavOpen,
    setIsNavOpen,
  } = layoutConfig;

  const shouldRenderMenu = hasNav && navVariant !== 'permanent';

  const menuIcon = {
    inactive: <MenuIcon />,
    active: <ChevronLeftIcon />,
  };

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
        <Typography variant="h6" component="h1" noWrap className={classes.title}>
          Thot
        </Typography>
        {layoutSource === 'connected' && (
          <IconButton component="a" color="inherit" onClick={() => signOut()}>
            <SignOutIcon className={classes.signOutIcon} />
            <Typography>Déconnexion</Typography>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.defaultProps = defaultProps;

export default Header;
