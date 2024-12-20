import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookies.get("token") || localStorage.getItem("MockApp");
  

  // parse the user data and storing in state.
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  const role = authUser?.user?.role; // Extract role
  const token = authUser?.token; // Extract token
  const name = authUser?.user?.name;

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, role, token, name]}>
    {children}
  </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  return context;
};
