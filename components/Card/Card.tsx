import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

export const Card = forwardRef<BoxProps, typeof Box>((props, ref) => (
  <Box
    shadow="md"
    border="1px"
    borderStyle="solid"
    borderColor="gray.200"
    borderRadius="lg"
    {...props}
    ref={ref}
  />
));
