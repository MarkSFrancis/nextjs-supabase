import React, { FC, useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { SignInUI } from '@/components/Auth/SignInUI';
import { ProfileList } from '@/components/Profile/ProfileList';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/constants';
import { Account } from '../Account/Account';
import { PageContainer } from '@/components/Container/PageContainer';

export const HomeLandingPage: FC = () => {
  const session = useAuthSession();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  async function getPublicProfiles() {
    try {
      const { data, error } = await supabase
        .from<Profile>('profiles')
        .select('id, username, avatar_url, website, updated_at')
        .order('updated_at', { ascending: false });

      if (error || !data) {
        throw error ?? new Error('No data');
      }
      console.info('Public profiles:', data);
      setProfiles(data);
    } catch (error) {
      console.error('error', (error as Error).message);
    }
  }

  useEffect(() => {
    getPublicProfiles();
  }, []);

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
            <ProfileList profiles={profiles} />
          </VStack>
        </SimpleGrid>
      )}
    </PageContainer>
  );
};
