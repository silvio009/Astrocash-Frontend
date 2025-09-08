
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLogged: boolean;
  setLogged: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setLogged: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setLogged: setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
