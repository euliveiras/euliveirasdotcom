import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "orange.50",
        color: "gray.800",
        fontFamily: "Ubuntu, sans-serif",
      },
    },
  },
  fonts: {
    body: "Ubuntu, sans-serif",
    heading: "Poppins, sans-serif",
    header: "Poppins, sans-serif",
  },
});
