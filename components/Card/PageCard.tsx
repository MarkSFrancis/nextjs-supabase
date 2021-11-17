import { BoxProps, forwardRef } from '@chakra-ui/react';
import React from 'react';
import { Card } from './Card';

export const PageCard = forwardRef<BoxProps, typeof Card>((props, ref) => (
  <Card
    p={6}
    py={{ base: 0, md: 6 }}
    shadow="none"
    borderColor={{ base: 'transparent', md: 'gray.200' }}
    {...props}
    ref={ref}
  />
));
