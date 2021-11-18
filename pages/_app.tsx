import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { SiteNavbar } from '@/views/SiteNavbar';
import { AppChakraProvider } from '@/components/AppChakraProvider';

const App = ({ Component, pageProps }: AppProps) => (
  <AppChakraProvider>
    <Head>
      <title>NextJS + Supabase</title>
    </Head>
    <SiteNavbar />
    <Component {...pageProps} />
  </AppChakraProvider>
);

export default App;
