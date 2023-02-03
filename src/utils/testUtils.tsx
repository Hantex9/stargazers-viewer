import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

// Custom render function wrapping the content inside the NativeBaseProvider providing the UI library theme
function render(ui: any, { ...renderOptions } = {}) {
  function Wrapper({ children }: any): any {
    return <NativeBaseProvider initialWindowMetrics={inset}>{children}</NativeBaseProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react-native';
export { render };
