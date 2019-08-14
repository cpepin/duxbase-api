import React from 'react';
import Head from 'next/head';

const Page = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <style jsx global>{`
      *,
      *::after,
      *::before {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
      }

      body {
        box-sizing: border-box;
        font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        color: #222;
        padding: 1rem;
      }

      h1 + *,
      * + h1,
      p + *,
      * + p {
        margin-top: 2rem;
      }

      ul {
        list-style: none;
      }

      li + li {
        margin-top: 1rem;
      }
    `}</style>

    <main>
      {children}
    </main>

    <style jsx>{`
      main {
        max-width: 800px;
        margin: 0 auto;
        margin-top: 3rem;
      }
    `}</style>
  </>
);

export default Page;
