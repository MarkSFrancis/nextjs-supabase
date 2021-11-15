import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

export const NavbarHomeLink = () => (
  <NextLink href="/" passHref>
    <IconButton as="a" icon={<>🏠</>} aria-label="Home page" />
  </NextLink>
);
