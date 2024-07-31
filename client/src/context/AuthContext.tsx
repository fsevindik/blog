import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../icons/types";
import { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_TOKEN = "token";
const LOCAL_STORAGE_KEY_USER_ID = "userId";
const LOCAL_STORAGE_KEY_USER_NAME = "userName";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
    const userName = localStorage.getItem(LOCAL_STORAGE_KEY_USER_NAME);
    return userId && userName ? ({ id: userId, name: userName } as User) : null;
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
      const response = await axios.get<User>("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        ...response.data,
        id:
          localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID) || response.data._id,
        name:
          localStorage.getItem(LOCAL_STORAGE_KEY_USER_NAME) ||
          response.data.name,
      });
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_NAME);
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    const { token, _id, ...userData } = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, _id);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, userData.name);
    setUser({ ...userData, id: _id });
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await axios.post("http://localhost:3000/users/register", {
      email,
      password,
      name,
    });
    const { token, _id, ...userData } = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, _id);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, name);
    setUser({ ...userData, id: _id });
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_NAME);
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
