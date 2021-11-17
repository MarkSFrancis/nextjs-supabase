import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { Account } from '@/views/Account/Account';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { SlimPageContainer } from '@/components/Container/SlimPageContainer';
import { PageCard } from '@/components/Card/PageCard';

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
    <SlimPageContainer px={0} maxW="lg">
      <PageCard>
        <Account key={session.user?.id} />
      </PageCard>
    </SlimPageContainer>
  );
};

export default MyProfile;
