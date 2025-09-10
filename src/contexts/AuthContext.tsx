import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLogged: boolean;
  setLogged: (value: boolean) => void;
  isInitialized: boolean; // novo estado
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setLogged: () => {},
  isInitialized: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
    setIsInitialized(true); // sinaliza que terminou de checar
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setLogged: setIsLogged, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
