/* eslint-disable no-alert, no-console */

import { render } from '@testing-library/react';

const Providers = ({ children }: { children: any }) => {
  return children;
};

const renderCustionVar: any = { wrapper: Providers };
const customRender = (ui: any, options = {}) => render(ui, { ...renderCustionVar, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
