import { IconButton } from '@chakra-ui/react';
import { IconSmartHome } from '@tabler/icons';
import NextLink from 'next/link';
import React from 'react';

export const NavbarHomeLink = () => (
  <NextLink href="/" passHref>
    <IconButton variant="outline" as="a" icon={<IconSmartHome />} aria-label="Home page" />
  </NextLink>
);
