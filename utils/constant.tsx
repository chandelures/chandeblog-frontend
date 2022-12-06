import { createTheme, responsiveFontSizes } from "@mui/material";
import { indigo } from "@mui/material/colors";
import GitHub from "@mui/icons-material/GitHub";
import Mail from "@mui/icons-material/Mail";

// Blog website main name
export const name: string = "CBlog";

// Blog logo name
export const logo: string = "CBLOG";

// Website description
export const description: string = "chandelure's blog";

// Website base URL
export const baseURL: string = process.env.baseURL || "http://127.0.0.1:3000";

// External api URL
export const apiURL: string = process.env.apiURL || "http://127.0.0.1:5000";

// Social Links
export const socialLinks = [
  { name: "Github", icon: GitHub, url: "https://github.com/chandelures" },
  { name: "Mail", icon: Mail, url: "mailto:wanghch@chandelure.me" },
];

// Theme
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
      fontSize: "1.8rem",
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
      fontSize: 18,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: 18,
    },
  },
});
theme = responsiveFontSizes(theme);
export { theme };
