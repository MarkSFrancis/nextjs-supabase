import { Box, Flex, HStack, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react';
import { PageContainer } from '@/components/Container/PageContainer';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { NavbarHomeLink } from './NavbarHomeLink';
import { NavbarSearch } from './NavbarSearch';
import { NavbarSignInLink } from './NavbarSignInLink';
import { NavbarProfileLink } from './NavbarProfileLink';
import { NavbarCreatePostLink } from './NavbarCreatePostLink';

export const SiteNavbar: FC = () => {
  const session = useAuthSession();

  return (
    <Box boxShadow="sm">
      <PageContainer py={2}>
        <Wrap justify="space-between" spacing={4}>
          <Box>
            <NavbarHomeLink />
          </Box>
          <Box flexGrow={1} maxW="lg">
            <NavbarSearch />
          </Box>
          <Flex flexGrow={{ base: 1, sm: 0 }} justifyContent="flex-end">
            {session ? (
              <HStack spacing={4}>
                <NavbarCreatePostLink />
                <NavbarProfileLink />
              </HStack>
            ) : (
              <NavbarSignInLink />
            )}
          </Flex>
        </Wrap>
      </PageContainer>
    </Box>
  );
};
