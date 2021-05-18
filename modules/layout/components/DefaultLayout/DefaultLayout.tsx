import { ReactElement, useState } from 'react';
import { signOut } from 'next-auth/client';

import { IconButton, makeStyles, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SignOutIcon from '@material-ui/icons/PowerSettingsNew';

import { useWidth } from '../../../ui';

import { LAYOUT_CONFIG, LayoutConfig } from '../../constants';
import { LayoutContext } from '../../services';
import { MainNav } from '../MainNav';
import Header from './DefaultHeader';
import Nav from './DefaultNav';
import Content from './DefaultContent';
import Footer from './DefaultFooter';

interface DefaultLayoutProps {
  children?: ReactElement;
}

const defaultProps = {
  children: null,
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  title: {
    textTransform: 'uppercase',
    flexGrow: 1,
  },
  signOutIcon: {
    marginRight: spacing(2),
  },
}));

export const getValueFromScreenWidth = (property, screenWidth) => {
  if (typeof property !== 'object') {
    return property;
  }

  return property[screenWidth] || property.default;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const classes = useStyles();
  const screenWidth = useWidth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const {
    navAnchor,
    navVariant,
    navWidth,
    isNavCollapsible,
    collapsedNavWidth,
    isHeaderClipped,
    headerPosition,
    shouldSqueezeContent,
    shouldShrinkFooter,
  } = LAYOUT_CONFIG;

  const value: LayoutConfig = {
    navAnchor: getValueFromScreenWidth(navAnchor, screenWidth),
    navVariant: getValueFromScreenWidth(navVariant, screenWidth),
    navWidth: getValueFromScreenWidth(navWidth, screenWidth),
    isNavCollapsible: getValueFromScreenWidth(isNavCollapsible, screenWidth),
    collapsedNavWidth: getValueFromScreenWidth(collapsedNavWidth, screenWidth),
    isHeaderClipped: getValueFromScreenWidth(isHeaderClipped, screenWidth),
    headerPosition: getValueFromScreenWidth(headerPosition, screenWidth),
    shouldSqueezeContent: getValueFromScreenWidth(shouldSqueezeContent, screenWidth),
    shouldShrinkFooter: getValueFromScreenWidth(shouldShrinkFooter, screenWidth),
    isNavOpen,
    isNavCollapsed,
    setIsNavOpen,
    setIsNavCollapsed,
  };

  return (
    <LayoutContext.Provider value={value}>
      <div className={classes.root}>
        <Header
          menuIcon={{
            inactive: <MenuIcon />,
            active: <ChevronLeftIcon />,
          }}
        >
          <Typography variant="h6" component="h1" noWrap className={classes.title}>
            Thot
          </Typography>
          <IconButton component="a" color="inherit" onClick={() => signOut()}>
            <SignOutIcon className={classes.signOutIcon} />
            <Typography>Déconnexion</Typography>
          </IconButton>
        </Header>
        <Nav
          collapsedIcon={{
            inactive: <ChevronLeftIcon />,
            active: <ChevronRightIcon />,
          }}
        >
          <MainNav />
        </Nav>
        <Content>{children}</Content>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
};

DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
