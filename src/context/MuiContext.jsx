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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        dir: "ltr",
        // sx: { boxShadow: "", borderRadius: "2rem" },
      },
      // styleOverrides:{}
    },
    MuiButton: {
      defaultProps: {
        sx: { boxShadow: "", borderRadius: "0.4rem" },
      },
    },
  },
});

export default function App({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
