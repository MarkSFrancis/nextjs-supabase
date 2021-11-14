import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { SiteNavbar } from '@/views/SiteNavbar';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Head>
      <title>NextJS + Supabase</title>
    </Head>
    <SiteNavbar />
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
