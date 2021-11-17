import { forwardRef, Heading, HeadingProps } from '@chakra-ui/react';
import React from 'react';

export const FormHeading = forwardRef<HeadingProps, typeof Heading>((props, ref) => (
  <Heading size="lg" as="h3" {...props} ref={ref} />
));
