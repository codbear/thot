import { Dispatch, SetStateAction } from 'react';

export type LayoutSource = 'connected' | 'anonymous';

export interface LayoutConfig {
  layoutSource: string;
  hasHeader: boolean;
  hasNav: boolean;
  hasFooter: boolean;
  navAnchor: 'bottom' | 'left' | 'right' | 'top';
  navVariant: 'permanent' | 'persistent' | 'temporary';
  navWidth: number;
  isNavCollapsible: boolean;
  collapsedNavWidth: number;
  isHeaderClipped: boolean;
  headerPosition: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky';
  shouldSqueezeContent: boolean;
  shouldShrinkFooter: boolean;
  isNavOpen?: boolean;
  isNavCollapsed?: boolean;
  setIsNavOpen?: Dispatch<SetStateAction<boolean>>;
  setIsNavCollapsed?: Dispatch<SetStateAction<boolean>>;
}

const DEFAULT_VALUES = {
  hasHeader: true,
  hasNav: true,
  hasFooter: true,
  navAnchor: 'left',
  navVariant: {
    default: 'permanent',
  },
  navWidth: 256,
  isNavCollapsible: true,
  collapsedNavWidth: 64,
  isHeaderClipped: true,
  headerPosition: 'sticky',
  shouldSqueezeContent: true,
  shouldShrinkFooter: true,
  isNavOpen: false,
  isNavCollapsed: false,
  setIsNavOpen() {},
  setIsNavCollapsed() {},
};

const LAYOUT_CONFIG = {
  CONNECTED: {
    ...DEFAULT_VALUES,
    layoutSource: 'connected',
    hasFooter: false,
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
  },
  ANONYMOUS: {
    ...DEFAULT_VALUES,
    layoutSource: 'anonymous',
    hasNav: false,
  },
};

export default LAYOUT_CONFIG;
