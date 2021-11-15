import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { Account } from '@/views/Account/Account';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { PageContainer } from '@/components/Container/PageContainer';
import { Card } from '@/components/Card/Card';

const MyProfile = () => {
  const { push } = useRouter();
  const session = useAuthSession();

  useEffect(() => {
    if (!session) {
      push('/auth/login');
    }
  }, []);

  if (!session) {
    return <></>;
  }

  return (
    <PageContainer px={0} maxW="lg">
      <Card p={6} shadow="none">
        <Account key={session.user?.id} />
      </Card>
    </PageContainer>
  );
};

export default MyProfile;
