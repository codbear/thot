import { ReactElement, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { useWidth } from '../../../ui';

import { LAYOUT_CONFIG, LayoutConfig } from '../../constants';
import { LayoutContext } from '../../services';
import Header from '../DefaultLayout/DefaultHeader';
import Content from '../DefaultLayout/DefaultContent';

interface DefaultLayoutProps {
  children?: ReactElement;
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
  title: {
    textTransform: 'uppercase',
    flexGrow: 1,
  },
});

export const getValueFromScreenWidth = (property, screenWidth) => {
  if (typeof property !== 'object') {
    return property;
  }

  return property[screenWidth] || property.default;
};

const AnonymousLayout = ({ children }: DefaultLayoutProps) => {
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
        <Header>
          <Typography variant="h6" component="h1" noWrap className={classes.title}>
            Thot
          </Typography>
        </Header>
        <Content>{children}</Content>
      </div>
    </LayoutContext.Provider>
  );
};

AnonymousLayout.defaultProps = defaultProps;

export default AnonymousLayout;
