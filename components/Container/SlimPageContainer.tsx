import { ContainerProps, forwardRef } from '@chakra-ui/react';
import React from 'react';
import { PageContainer } from './PageContainer';

export const SlimPageContainer = forwardRef<ContainerProps, typeof PageContainer>((props, ref) => (
  <PageContainer maxW="lg" px={0} {...props} ref={ref} />
));
