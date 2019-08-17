import React from 'react';
import { AppProvider } from '@shopify/polaris';

const Public = ({ children }) => (
  <AppProvider>
    {children}
  </AppProvider>
);

export default Public;
