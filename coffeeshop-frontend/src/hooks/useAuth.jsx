import { useState, useEffect, useContext, createContext } from "react";
import { getAuthenticatedUser } from "../tools/authentication";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    tryRestoreUserSession();
  }, []);

  const value = {
    user,
    setUser,
    tryRestoreUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function tryRestoreUserSession() {
    if (!user) {
      const loggedInUser = getAuthenticatedUser();
      if (loggedInUser) {
        console.log("User session found in cookies, restoring");
        setUser(loggedInUser);
        console.log(loggedInUser.id);
      }
    }
  }
}
