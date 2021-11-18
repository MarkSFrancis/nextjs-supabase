/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import { useSessionProfile } from '@/hooks/profiles/useSessionProfile';

export const NavbarCreatePostLink: FC = () => {
  const { data: sessionProfile } = useSessionProfile();

  if (!sessionProfile) {
    return <></>;
  }

  return (
    <NextLink href="/posts/make-a-post" passHref>
      <Button as="a" colorScheme="green" variant="outline">
        Make a post
      </Button>
    </NextLink>
  );
};
