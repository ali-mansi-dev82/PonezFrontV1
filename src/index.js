import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { CityProvider } from "./context/CityContext";
import ThemeProvider from "./context/MuiContext";
import { ResponsiveProvider } from "./context/ResponsiveContext";

const queryClient = new QueryClient({});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResponsiveProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <CityProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </CityProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ResponsiveProvider>
  </React.StrictMode>
);

reportWebVitals();
