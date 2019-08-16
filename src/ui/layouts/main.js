import React from 'react';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { Page, AppProvider, Layout } from '@shopify/polaris';

const Main = ({ children, title = '' }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <AppProvider>
      <Page title={title}>
        <Layout>
          {children}
        </Layout>
      </Page>
    </AppProvider>
  </>
);

export default Main;
