import React from 'react';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </>
);

export default App;
