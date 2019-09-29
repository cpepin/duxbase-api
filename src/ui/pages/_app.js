import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import '@shopify/polaris/styles.css';

import AuthProvider from '../providers/AuthProvider';
import { auth } from '../constants/routes';
import { AppProvider } from '@shopify/polaris';

const App = ({ Component, pageProps, user, userError }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <AppProvider>
      <AuthProvider initialUser={user} initialError={userError}>
        <Component {...pageProps} />
      </AuthProvider>
    </AppProvider>
  </>
);

App.getInitialProps = async ({ Component, ctx }) => {
  const { req } = ctx;
  let pageProps = {};
  let user = undefined;
  let userError = '';

  if (req) {
    const token = req.cookies['squad-leader-session'];

    try {
      const response = await fetch(auth.me(), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const responseJson = await response.json();

      if (responseJson.isBoom) {
        userError = responseJson;
      } else {
        user = responseJson;
      }
    } catch (e) {
      userError = e;
    }
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { user, userError, pageProps };
};

export default App;
