import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { getAuthenticatedUser } from "../tools/authentication";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tryRestoreUserSession();
  }, []);

  const value = {
    user,
    loading,
    setUser,
    tryRestoreUserSession,
  };

  function tryRestoreUserSession() {
    if (!user) {
      const loggedInUser = getAuthenticatedUser();
      if (loggedInUser) {
        console.log(
          "User session found in cookies, restoring: " + loggedInUser.username
        );
        setUser(loggedInUser);
      }
    }
    setLoading(false);
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
