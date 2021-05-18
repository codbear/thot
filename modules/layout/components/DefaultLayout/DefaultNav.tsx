import { ReactNode } from 'react';
import cx from 'classnames';

import { makeStyles, Drawer, Button, IconButton, Grow } from '@material-ui/core';

import { useLayoutConfig } from '../../services';

interface DefaultNavProps {
  className?: string;
  header?: ReactNode;
  children?: ReactNode;
  collapsedIcon?: {
    inactive: ReactNode;
    active: ReactNode;
  };
}

const defaultProps = {
  className: '',
  header: null,
  collapsedIcon: null,
  children: null,
};

const useStyles = makeStyles(
  ({ breakpoints, transitions, palette, spacing, zIndex, shadows, mixins }) => ({
    root: {},
    container: {
      overflow: 'hidden',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    content: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    offset: mixins.toolbar,
    collapseButton: {
      backgroundColor: palette.grey[50],
      textAlign: 'center',
      borderRadius: 0,
      borderTop: '1px solid',
      borderColor: 'rgba(0,0,0,0.12)',
      [breakpoints.up('sm')]: {
        minHeight: 40,
      },
    },
    closeButton: {
      position: 'absolute',
      bottom: spacing(2),
      zIndex: zIndex.modal + 1,
      background: palette.common.white,
      boxShadow: shadows[2],
      '@media (hover: none)': {
        backgroundColor: palette.grey[300],
      },
      '&:hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  }),
);

const DefaultNav = ({ className, header, children, collapsedIcon, ...props }: DefaultNavProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    navAnchor,
    navVariant,
    navWidth,
    isNavCollapsible,
    collapsedNavWidth,
    isHeaderClipped,
    isNavOpen,
    isNavCollapsed,
    setIsNavOpen,
    setIsNavCollapsed,
  } = layoutConfig;

  const width = isNavCollapsible && isNavCollapsed ? collapsedNavWidth : navWidth;

  const shouldRenderButton = isNavCollapsible && collapsedIcon;

  const handleClose = () => {
    setIsNavOpen(false);
  };

  const handleCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <Drawer
        {...props}
        className={cx(className, classes.root)}
        open={isNavOpen}
        onClose={handleClose}
        variant={navVariant}
        anchor={navAnchor}
      >
        <div className={classes.container} style={{ width }}>
          {isHeaderClipped && <div className={classes.offset} />}
          {header}
          <div className={classes.content}>{children}</div>
          {shouldRenderButton && (
            <Button className={classes.collapseButton} fullWidth onClick={handleCollapse}>
              {isNavCollapsed
                ? collapsedIcon.active
                : collapsedIcon.inactive || collapsedIcon.active}
            </Button>
          )}
        </div>
      </Drawer>
      <Grow in={isNavOpen && navVariant === 'temporary' && !!collapsedIcon}>
        <IconButton
          className={classes.closeButton}
          style={{ left: navWidth + 16 }}
          onClick={handleClose}
        >
          {collapsedIcon.inactive}
        </IconButton>
      </Grow>
    </>
  );
};

DefaultNav.defaultProps = defaultProps;

export default DefaultNav;
