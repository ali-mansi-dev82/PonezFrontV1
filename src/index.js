import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CityProvider } from "./context/CityContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CityProvider>
      <AuthProvider>
        {" "}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  </React.StrictMode>
);
reportWebVitals();
