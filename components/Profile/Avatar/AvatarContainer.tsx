import { Box, Center, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface AvatarContainerProps {
  isLoading?: boolean;
  size?: number;
}

export const AvatarContainer: FC<AvatarContainerProps> = (props) => {
  const borderWidth = 1;
  const size = props.size ? props.size + borderWidth * 2 : undefined;

  const children = props.children ?? (
    <Center h="100%">{props.isLoading ? <Spinner /> : <>?</>}</Center>
  );

  return (
    <Box
      border={borderWidth}
      borderColor="gray.200"
      borderStyle="solid"
      borderRadius="50%"
      w={size}
      h={size}
      display="inline-block"
      overflow="hidden"
    >
      {children}
    </Box>
  );
};
