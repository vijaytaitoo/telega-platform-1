import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { theme } from './styles/theme';
import { router } from './routes';

export const App = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
};

export default App;
