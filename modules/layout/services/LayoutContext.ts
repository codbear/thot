import { createContext, useContext } from 'react';
import { LayoutConfig } from '../constants';

export const LayoutContext = createContext(null);

const useLayoutConfig = (): LayoutConfig => {
  return useContext(LayoutContext);
};

export default useLayoutConfig;
