"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthInitializer } from "../lib/auth/auth-initializer";
import { authService } from "@/lib/auth/api";

interface AuthContextType {
  loading: boolean;
  authenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  authenticated: false,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const initializer = new AuthInitializer(authService);

      const result = await initializer.initialize();

      setAuthenticated(result.authenticated);
      setLoading(false);
    };

    initialize();
  }, []);

  const value = useMemo(
    () => ({
      loading,
      authenticated,
    }),
    [loading, authenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}