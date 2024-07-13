import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const BASE_URL = "http://localhost:8080/api/v1";

  const [cookies, setCookies] = useCookies(["user"]);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth]);

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
        isAuth,
        setIsAuth,
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
