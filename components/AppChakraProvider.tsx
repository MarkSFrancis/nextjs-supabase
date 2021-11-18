import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import React, { FC } from 'react';

export const AppChakraProvider: FC = (props) => {
  const theme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'green',
    })
  );

  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
};
