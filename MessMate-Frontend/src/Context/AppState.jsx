import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
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
