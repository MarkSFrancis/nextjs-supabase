import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Account } from '@/views/Account/Account';
import { useAuthSession } from '@/hooks/useAuthSession';
import { PageContainer } from '@/components/Container/PageContainer';

const MyProfile = () => {
  const { push } = useRouter();
  const session = useAuthSession();

  useEffect(() => {
    if (!session) {
      push('/auth/login');
    }
  }, []);

  return (
    <PageContainer>
      {!session ? (
        <></>
      ) : (
        <SimpleGrid columns={2}>
          <Box>
            <h3>Account</h3>
            <Account key={session.user?.id} session={session} />
          </Box>
        </SimpleGrid>
      )}
    </PageContainer>
  );
};

export default MyProfile;
