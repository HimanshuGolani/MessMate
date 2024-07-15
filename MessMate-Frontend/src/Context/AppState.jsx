import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const BASE_URL = "http://localhost:8080/api/v1";

  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth]);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [vendorId, setVendorId] = useState("");

  return (
    <AppContext.Provider
      value={{
        vendorId,
        setVendorId,
        role,
        setRole,
        BASE_URL,
        userId,
        setUserId,
        userName,
        setUserName,
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
