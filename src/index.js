import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CityProvider } from "./context/CityContext";
import ThemeProvider from "./context/MuiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider><CityProvider>
      <AuthProvider>
        {" "}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CityProvider></ThemeProvider>
    
  </React.StrictMode>
);
reportWebVitals();
