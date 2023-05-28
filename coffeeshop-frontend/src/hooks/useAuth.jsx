import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { getAuthenticatedUser } from "../tools/authentication";

const AuthContext = createContext();

/**
 * Provides access to the AuthContext.
 * @returns The current context value for AuthContext.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * A provider for AuthContext, responsible for managing user authentication state.
 * @param {Object} props The children elements to be rendered within this context.
 * @returns The AuthContext provider with the children elements.
 */
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

  /**
   * Attempts to restore a user session if one exists.
   * If there is a user session, it's restored. If not, state remains null.
   */
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
