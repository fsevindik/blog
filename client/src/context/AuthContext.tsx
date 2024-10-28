import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/types";
import { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_TOKEN = "token";
const LOCAL_STORAGE_KEY_USER_ID = "userId";
const LOCAL_STORAGE_KEY_USER_NAME = "userName";
const LOCAL_STORAGE_KEY_USER_ROLE = "userRole";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
    const userName = localStorage.getItem(LOCAL_STORAGE_KEY_USER_NAME);
    const userRole = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ROLE);
    return userId && userName && userRole
      ? ({ id: userId, name: userName, role: userRole } as User)
      : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get<User>(
        "https://serverfilmolog.onrender.com/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { _id, role, ...userData } = response.data;
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, _id);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, userData.name);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_ROLE, role);
      setUser({ ...userData, _id, role });
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_NAME);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ROLE);
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      "https://serverfilmolog.onrender.com/users/login",
      {
        email,
        password,
      }
    );
    const { token, _id, role, ...userData } = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, _id);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, userData.name);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ROLE, role);
    setUser({ ...userData, id: _id, role });
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await axios.post(
      "https://serverfilmolog.onrender.com/users/register",
      {
        email,
        password,
        name,
      }
    );
    const { token, _id, role, ...userData } = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, _id);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, name);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ROLE, role);
    setUser({ ...userData, id: _id, role });
  };

  const logout = () => {
    localStorage.clear();
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
