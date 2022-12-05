import type { AppProps } from "next/app";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import { indigo } from "@mui/material/colors";

import Layout from "components/base/Layout";
import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary: indigo,
    text: {
      primary: "#0C3C26",
      secondary: "#607261",
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "1.8rem"
    },
    h3: {
      fontSize: "1.4rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontFamily: '"PT Sans", Helvetica, Arial, sans-serif',
      fontSize: 18,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: 18,
      fontFamily: '"PT Sans", Helvetica, Arial, sans-serif',
    },
  },
});

theme = responsiveFontSizes(theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
  );
}
