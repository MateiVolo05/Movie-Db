import { extendTheme } from '@chakra-ui/react';

const colors = {};
const components = {
  Container: {
    baseStyle: {
      maxW: 'container.xl',
    },
  },
};
const config = {
  initialColorMode: 'dark',
};
const fonts={
  heading:'actor, sans-serif',
  body:'actor, sans-serif'
}

const theme = extendTheme({ colors, components, config, fonts});

export default theme;