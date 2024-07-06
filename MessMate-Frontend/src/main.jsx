import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import AppFieldsProvider from "./Context/AppState.jsx";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider>
      <BrowserRouter>
        <AppFieldsProvider>
          <App />
        </AppFieldsProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
