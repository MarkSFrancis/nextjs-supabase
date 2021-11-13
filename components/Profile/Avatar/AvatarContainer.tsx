import { Box, Center } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface AvatarContainerProps {
  size?: number;
}

export const AvatarContainer: FC<AvatarContainerProps> = (props) => (
  <Box
    borderWidth="1px"
    borderColor="gray.200"
    borderStyle="solid"
    w={props.size}
    h={props.size}
    display="inline-block"
  >
    {props.children ?? <Center h="100%">?</Center>}
  </Box>
);
