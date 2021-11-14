import React, { FC } from 'react';
import { Box, Heading, SimpleGrid, Spinner, VStack } from '@chakra-ui/react';
import { SignInUI } from '@/components/Auth/SignInUI';
import { ProfileList } from '@/components/Profile/ProfileList';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { Account } from '../Account/Account';
import { PageContainer } from '@/components/Container/PageContainer';
import { usePublicProfiles } from '@/hooks/profiles/usePublicProfiles';

export const HomeLandingPage: FC = () => {
  const session = useAuthSession();
  const { publicProfiles } = usePublicProfiles();

  return (
    <PageContainer maxW="container.lg">
      {!session ? (
        <SignInUI />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          <Box>
            <Account key={session.user?.id} />
          </Box>
          <VStack align="stretch" spacing={4}>
            <Heading size="lg" as="h3">
              Public profiles
            </Heading>
            {publicProfiles ? <ProfileList profiles={publicProfiles} /> : <Spinner />}
          </VStack>
        </SimpleGrid>
      )}
    </PageContainer>
  );
};
