import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

import { ResponsiveProvider } from "./context/ResponsiveContext";
import { CityProvider } from "./context/CityContext";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/MuiContext";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const queryClient = new QueryClient({});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ResponsiveProvider>
          <QueryClientProvider client={queryClient}>
            <CityProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </CityProvider>
          </QueryClientProvider>
        </ResponsiveProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
