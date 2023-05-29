import React, { createContext, ReactElement, useState } from "react";

type AuthContextValue = {
  login: () => void;
  logout: () => void;
  isLogged: boolean;
};

const defaultAuthContextValue: AuthContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  isLogged: false,
};

export const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue);

type AuthProps = {
  children: ReactElement | ReactElement[];
};

const AuthContextProvider: React.FC<AuthProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextValue>({
    ...defaultAuthContextValue,
    login: () => {
      localStorage.setItem("isLoggedIn", "true");
      setAuth({ ...auth, isLogged: true });
    },
    logout: () => {
      localStorage.setItem("isLoggedIn", "false");
      setAuth({ ...auth, isLogged: false });
    },
    isLogged: localStorage.getItem("isLoggedIn") === "true",
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
