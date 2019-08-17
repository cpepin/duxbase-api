import React from 'react';
import { Frame, AppProvider, TopBar } from '@shopify/polaris';

const Protected = ({ children }) => (
  <AppProvider>
    <Frame topBar={<TopBar />}>
      {children}
    </Frame>
  </AppProvider>
);

export default Protected;
