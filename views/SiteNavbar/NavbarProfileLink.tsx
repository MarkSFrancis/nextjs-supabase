/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import NextLink from 'next/link';
import { Spinner, Tooltip } from '@chakra-ui/react';
import { useSessionProfile } from '@/hooks/profiles/useSessionProfile';
import { ProfileProvider } from '@/components/Profile/ProfileContext';
import { ProfileAvatar } from '@/components/Profile/ProfileAvatar';

export const NavbarProfileLink: FC = () => {
  const { data: sessionProfile } = useSessionProfile();

  if (!sessionProfile) {
    return <Spinner />;
  }

  return (
    <ProfileProvider value={{ profile: sessionProfile }}>
      <NextLink href="/auth/my-profile">
        <a>
          <Tooltip label="Edit your profile">
            <ProfileAvatar height="2em" width="2em" />
          </Tooltip>
        </a>
      </NextLink>
    </ProfileProvider>
  );
};
