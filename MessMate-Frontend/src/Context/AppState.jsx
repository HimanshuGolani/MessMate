import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const BASE_URL = "https://mess-mate-backend.onrender.com/api/v1";

  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [vendorId, setVendorId] = useState(
    localStorage.getItem("vendorId") || ""
  );
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("customerId") || ""
  );

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("vendorId", vendorId);
  }, [vendorId]);

  useEffect(() => {
    localStorage.setItem("customerId", customerId);
  }, [customerId]);

  return (
    <AppContext.Provider
      value={{
        customerId,
        setCustomerId,
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
