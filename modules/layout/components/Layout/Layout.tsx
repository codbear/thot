import { ReactElement, useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { useWidth } from '../../../ui';

import { LayoutConfig } from '../../constants';
import { LayoutContext } from '../../services';

import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

interface DefaultLayoutProps {
  children?: ReactElement;
  layoutConfig: LayoutConfig;
}

const defaultProps = {
  children: null,
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
});

export const getValueFromScreenWidth = (property, screenWidth) => {
  if (typeof property !== 'object') {
    return property;
  }

  return property[screenWidth] || property.default;
};

const Layout = ({ children, layoutConfig }: DefaultLayoutProps) => {
  const classes = useStyles();
  const screenWidth = useWidth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const {
    hasHeader,
    hasNav,
    hasFooter,
    navAnchor,
    navVariant,
    navWidth,
    isNavCollapsible,
    collapsedNavWidth,
    isHeaderClipped,
    headerPosition,
    shouldSqueezeContent,
    shouldShrinkFooter,
  } = layoutConfig;

  const value: LayoutConfig = {
    ...layoutConfig,
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
        {hasHeader && <Header />}

        {hasNav && <Nav />}

        <Content>{children}</Content>

        {hasFooter && <Footer />}
      </div>
    </LayoutContext.Provider>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
