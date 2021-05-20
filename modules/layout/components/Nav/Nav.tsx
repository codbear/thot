import cx from 'classnames';

import { makeStyles, Drawer, Button, IconButton, Grow, List, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

import { useLayoutConfig } from '../../services';

import { NavItem } from '../NavItem';

interface DefaultNavProps {
  className?: string;
}

const defaultProps = {
  className: '',
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

const Nav = ({ className, ...props }: DefaultNavProps) => {
  const classes = useStyles();
  const layoutConfig = useLayoutConfig();

  const {
    hasNav,
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

  const shouldRenderCollapseButton = hasNav && isNavCollapsible;

  const collapsedIcon = {
    inactive: <ChevronLeftIcon />,
    active: <ChevronRightIcon />,
  };

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

          <div className={classes.content}>
            <List aria-label="Bibliothèque">
              <NavItem primary="Bibliothèque" to="/" icon={<HomeOutlinedIcon />} />
              <NavItem primary="Recherche" to="/search" icon={<SearchOutlinedIcon />} />
            </List>
            <Divider />
            <List aria-label="Métadonnées">
              <NavItem primary="Auteurs" to="/metas/authors" icon={<PeopleAltOutlinedIcon />} />
              <NavItem primary="Genres" to="/metas/genres" icon={<BookmarksOutlinedIcon />} />
              <NavItem primary="Éditeur" to="/metas/publishers" icon={<StoreOutlinedIcon />} />
            </List>
            <Divider />
            <List aria-label="Paramètres">
              <NavItem primary="Paramètres" to="/my/settings" icon={<SettingsOutlinedIcon />} />
              <NavItem primary="Mon compte" to="/my/account" icon={<AccountBoxOutlinedIcon />} />
            </List>
          </div>

          {shouldRenderCollapseButton && (
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

Nav.defaultProps = defaultProps;

export default Nav;
