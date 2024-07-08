import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import AppFieldsProvider from "./Context/AppState.jsx";
import { CookiesProvider } from "react-cookie";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider>
      <BrowserRouter>
        <CookiesProvider>
          <AppFieldsProvider>
            <App />
          </AppFieldsProvider>
        </CookiesProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
