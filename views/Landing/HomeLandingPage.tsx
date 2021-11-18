import React, { FC } from 'react';
import { PageContainer } from '@/components/Container/PageContainer';
import { PostsDashboard } from '../Posts/PostsDashboard';

export const HomeLandingPage: FC = () => (
  <PageContainer maxW="container.lg">
    <PostsDashboard />
  </PageContainer>
);
