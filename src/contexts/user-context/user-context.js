import { createContext, useContext, useState } from "react";
import { initialUserState } from "./user-utils";
import { auth } from "../../firebase/firebase-config";

const AuthContext = createContext(initialUserState);

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);

  const value = { userState, setUserState, auth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export { AuthProvider };
