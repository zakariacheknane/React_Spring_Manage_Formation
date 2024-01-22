import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Define your user-related functions here
  const isUserAdmin = () => {
    const storedData = localStorage.getItem("user");
    const decodedData = storedData ? JSON.parse(atob(storedData)) : null;
    return decodedData && decodedData.roles && decodedData.roles.includes("ROLE_ADMIN");
  };

  const isUserAssistent = () => {
    const storedData = localStorage.getItem("user");
    const decodedData = storedData ? JSON.parse(atob(storedData)) : null;
    return decodedData && decodedData.roles && decodedData.roles.includes("ROLE_ASSISTENT");
  };

  const contextValue = {
    isUserAdmin,
    isUserAssistent,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
