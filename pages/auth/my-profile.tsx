import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
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

  if (!session) {
    return <></>;
  }

  return (
    <PageContainer>
      <Account key={session.user?.id} />
    </PageContainer>
  );
};

export default MyProfile;
