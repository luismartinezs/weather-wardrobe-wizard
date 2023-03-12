// theme.ts
import { baseTheme, extendTheme, withDefaultColorScheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,

};

const theme = extendTheme({
  config, colors: {
    primary: baseTheme.colors.blue,
    secondary: baseTheme.colors.cyan,
    tertiary: baseTheme.colors.pink,
  },
},
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),);

export default theme;
