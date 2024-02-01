import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Define your user-related functions here
  const isUserAdmin = () => {
    const storedData = localStorage.getItem("role");
    return storedData  && storedData.includes("ROLE_ADMIN");
  };

  const isUserAssistent = () => {
    const storedData = localStorage.getItem("role");
    return storedData  && storedData.includes("ROLE_ASSISTENT");
  };
  const isUserFormateur = () => {
    const storedData = localStorage.getItem("role");
    return storedData  && storedData.includes("ROLE_FORMATEUR");
  };

  const contextValue = {
    isUserAdmin,
    isUserAssistent,
    isUserFormateur
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
