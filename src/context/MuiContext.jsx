import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createRtlCache from "./rtlCatch";
import { CacheProvider } from "@emotion/react";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      light: "#2B7FAD",
      main: "#22668A",
      dark: "#1E5979",
      contrastText: "#fff",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#EAF2F7",
          color: "#22668A",
          borderRadius: "8px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: "red",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        dir: "ltr",
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: { borderRadius: "24px" },
        className:''
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
        
      },
    },
    MuiRadio:{
      styleOverrides: {
        root: {
          color:'#D1D5DB',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          paddingY: "10px",
          borderRadius: "8px",
          boxShadow: "none",
        },
      },
      styleOverrides: {
        contained: {
          fontWeight: 500,
        },
        outlined: {
          borderColor: "#E5E7EB",
          color: "#111928",
        },
      },
    },
  },
});

const cacheRtl = createRtlCache();

export default function App({ children }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="rtl">{children}</div>
      </ThemeProvider>
    </CacheProvider>
  );
}
