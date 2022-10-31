import { useContext, createContext } from 'react';

const layoutContextDefaultValue = {
  header: null,
  content: null,
};

export const LayoutContext =
  createContext<Record<keyof typeof layoutContextDefaultValue, HTMLElement>>(
    layoutContextDefaultValue
  );

export function useLayout() {
  return useContext(LayoutContext);
}
