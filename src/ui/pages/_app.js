import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';

import AuthProvider from '../providers/AuthProvider';
import { auth } from '../constants/routes';

const App = ({ Component, pageProps, user, failedPreLoad }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <AuthProvider initialUser={user} failedPreLoad={failedPreLoad}>
      <Component {...pageProps} />
    </AuthProvider>
  </>
);

App.getInitialProps = async ({ ctx }) => {
  const { req } = ctx;
  let user = undefined;
  let failedPreLoad = false;

  if (req) {
    const token = req.cookies['squad-leader-session'];

    try {
      const response = await fetch(auth.me(), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const responseJson = await response.json();

      if (responseJson.isBoom) {
        failedPreLoad = true;
      } else {
        user = responseJson;
      }
    } catch (e) {
      failedPreLoad = true;
    }
  }

  return { user, failedPreLoad };
};

export default App;
