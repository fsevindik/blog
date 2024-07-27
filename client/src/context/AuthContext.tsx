import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../icons/types";
import { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token) {
      validateToken(token, userName);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string, userName: string | null) => {
    try {
      const response = await axios.get<User>("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...response.data, name: userName || response.data.name });
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    const { token, ...userData } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userData.name);
    setUser(userData);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await axios.post("http://localhost:3000/users/register", {
      email,
      password,
      name,
    });
    const { token, ...userData } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
