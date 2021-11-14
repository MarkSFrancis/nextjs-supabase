import { Container, ContainerProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

export const PageContainer = forwardRef<ContainerProps, typeof Container>((props, ref) => (
  <Container maxW="container.lg" py={6} {...props} ref={ref} />
));
