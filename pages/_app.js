import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react'
import { Layout } from '../components';
import '../styles/index.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps, session }) {

  const { user } = pageProps
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Layout >
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </SessionProvider>
  )
}

export default MyApp


