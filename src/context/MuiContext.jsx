import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#4A92CC",
      main: "#2F80C0",
      dark: "#156FB7",
      contrastText: "#fff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        // sizeMedium: { width: "40px", height: "40px" },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        dir: "ltr",
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          // boxShadow: "",
          // borderRadius: "0.4rem",
          // fontWeight: 500,
          // padding: "0.5rem 1.1rem",
          // fontSize: '0.9rem',
        },
      },
      styleOverrides: {
        contained: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default function App({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
