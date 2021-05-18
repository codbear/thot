import { Dispatch, SetStateAction } from 'react';

export interface LayoutConfig {
  navAnchor: 'left' | 'top' | 'right' | 'bottom';
  navVariant: 'permanent' | 'persistent' | 'temporary';
  navWidth: number;
  isNavCollapsible: boolean;
  collapsedNavWidth: number;
  isHeaderClipped: boolean;
  headerPosition: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  shouldSqueezeContent: boolean;
  shouldShrinkFooter: boolean;
  isNavOpen?: boolean;
  isNavCollapsed?: boolean;
  setIsNavOpen?: Dispatch<SetStateAction<boolean>>;
  setIsNavCollapsed?: Dispatch<SetStateAction<boolean>>;
}

const LAYOUT_CONFIG = {
  navAnchor: 'left',
  navVariant: {
    default: 'permanent',
    xs: 'temporary',
    sm: 'temporary',
  },
  navWidth: {
    default: 256,
    xs: 240,
  },
  isNavCollapsible: {
    default: true,
    xs: false,
    sm: false,
    md: false,
  },
  collapsedNavWidth: {
    default: 64,
  },
  isHeaderClipped: {
    default: true,
  },
  headerPosition: {
    default: 'sticky',
  },
  shouldSqueezeContent: {
    default: true,
  },
  shouldShrinkFooter: {
    default: true,
  },
  isNavOpen: false,
  isNavCollapsed: false,
  setIsNavOpen() {},
  setIsNavCollapsed() {},
};

export default LAYOUT_CONFIG;
