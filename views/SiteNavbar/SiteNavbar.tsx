import { Box, HStack, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react';
import { PageContainer } from '@/components/Container/PageContainer';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { NavbarHomeLink } from './NavbarHomeLink';
import { NavbarSearch } from './NavbarSearch';
import { NavbarSignInLinks } from './NavbarSignInLink';
import { NavbarProfileLink } from './NavbarProfileLink';

export const SiteNavbar: FC = () => {
  const session = useAuthSession();

  return (
    <Box boxShadow="sm">
      <PageContainer p={2}>
        <Wrap justify="space-between" spacing={4}>
          <NavbarHomeLink />
          <Box flexGrow={1} maxW="lg">
            <NavbarSearch />
          </Box>
          <HStack>{session ? <NavbarProfileLink /> : <NavbarSignInLinks />}</HStack>
        </Wrap>
      </PageContainer>
    </Box>
  );
};
