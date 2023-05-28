import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
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

  const tryRestoreUserSession = useCallback(() => {
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
  }, [user]);

  useEffect(() => {
    tryRestoreUserSession();
  }, [tryRestoreUserSession]);

  const value = {
    user,
    loading,
    setUser,
    tryRestoreUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
