import React, { FC } from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

export const NavbarSignInLink: FC = () => (
  <NextLink href="/auth/login" passHref>
    <Button as="a">Sign in or register</Button>
  </NextLink>
);
