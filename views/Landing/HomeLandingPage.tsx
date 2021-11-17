import React, { FC } from 'react';
import { SignInUI } from '@/components/Auth/SignInUI';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { PageContainer } from '@/components/Container/PageContainer';
import { PostsDashboard } from '../Posts/PostsDashboard';

export const HomeLandingPage: FC = () => {
  const session = useAuthSession();

  return (
    <PageContainer maxW="container.lg">
      {!session ? <SignInUI /> : <PostsDashboard />}
    </PageContainer>
  );
};
