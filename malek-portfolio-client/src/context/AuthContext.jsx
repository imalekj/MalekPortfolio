import { createContext, useContext, useState, useCallback } from "react";
import { login as loginRequest } from "../api/auth";

const AuthContext = createContext(null);

function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("admin_token");
    return isTokenValid(stored) ? stored : null;
  });

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);
    localStorage.setItem("admin_token", data.token);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
  }, []);

  const value = {
    token,
    isAuthenticated: isTokenValid(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
