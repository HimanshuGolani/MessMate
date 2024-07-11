import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppFieldsProvider from "./Context/AppState.jsx";
import { CookiesProvider } from "react-cookie";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <CookiesProvider>
          <AppFieldsProvider>
            <App />
          </AppFieldsProvider>
        </CookiesProvider>
      </BrowserRouter>
    </>
  </React.StrictMode>
);
