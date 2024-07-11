import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const BASE_URL = "http://localhost:8080/api/v1";

  const [cookies, setCookies] = useCookies(["user"]);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <AppContext.Provider
      value={{
        BASE_URL,
        userId,
        setUserId,
        userName,
        setUserName,
        cookies,
        setCookies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppFieldsProvider;
