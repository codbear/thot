import { LAYOUT_CONFIG, LayoutConfig, LayoutSource } from '../constants';

const getValueFromScreenWidth = (property, screenWidth) => {
  if (typeof property !== 'object') {
    return property;
  }

  return property[screenWidth] || property.default;
};

const getLayoutConfig = (layoutSource: LayoutSource, screenWidth): LayoutConfig => {
  const layoutToLayoutConfig = {
    [LAYOUT_CONFIG.ANONYMOUS.layoutSource]: LAYOUT_CONFIG.ANONYMOUS,
    [LAYOUT_CONFIG.CONNECTED.layoutSource]: LAYOUT_CONFIG.CONNECTED,
  };

  const layoutConfig = layoutToLayoutConfig[layoutSource];

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
  } = layoutConfig;

  return {
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
  };
};

export default getLayoutConfig;
