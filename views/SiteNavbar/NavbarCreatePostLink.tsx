/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import NextLink from 'next/link';
import { forwardRef, IconButton, Tooltip } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons';
import { useSessionProfile } from '@/hooks/profiles/useSessionProfile';

const CreatePostLink = forwardRef((props, ref) => (
  <NextLink href="/posts/new" passHref>
    <IconButton
      ref={ref}
      as="a"
      colorScheme="green"
      variant="outline"
      icon={<IconPlus />}
      aria-label="Make a post"
      {...props}
    />
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
