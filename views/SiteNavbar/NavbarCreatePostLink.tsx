/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import NextLink from 'next/link';
import { Button, forwardRef, Tooltip } from '@chakra-ui/react';
import { useSessionProfile } from '@/hooks/profiles/useSessionProfile';

const CreatePostLink = forwardRef((props, ref) => (
  <NextLink href="/posts/new" passHref>
    <Button ref={ref} as="a" colorScheme="green" variant="outline" {...props}>
      Make a post
    </Button>
  </NextLink>
));

export const NavbarCreatePostLink: FC = () => {
  const { data: sessionProfile } = useSessionProfile();

  if (!sessionProfile) {
    return <></>;
  }

  return (
    <Tooltip label="Make a post">
      <CreatePostLink />
    </Tooltip>
  );
};
