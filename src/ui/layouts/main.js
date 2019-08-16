import React from 'react';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { Page, AppProvider, Layout } from '@shopify/polaris';

const Main = ({ children, ...rest }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <AppProvider>
      <Page {...rest}>
        <Layout>
          {children}
        </Layout>
      </Page>
    </AppProvider>
  </>
);

export default Main;
