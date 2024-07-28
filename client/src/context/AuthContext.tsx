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
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (token) {
      validateToken(token, userId, userName);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (
    token: string,
    userId: string | null,
    userName: string | null
  ) => {
    try {
      const response = await axios.get<User>("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        ...response.data,
        id: userId || response.data._id,
        name: userName || response.data.name,
      });
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    const { token, _id, ...userData } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", _id);
    localStorage.setItem("userName", userData.name);
    setUser({ ...userData, id: _id });
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await axios.post("http://localhost:3000/users/register", {
      email,
      password,
      name,
    });
    const { token, _id, ...userData } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", _id);
    localStorage.setItem("userName", name);
    setUser({ ...userData, id: _id });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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
