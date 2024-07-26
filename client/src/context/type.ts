import { ReactNode } from "react";
import { User } from "../icons/types";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface FilmContextProps {
  search: string;
  handleSearch: (newSearch: string) => void;
}

export interface FilmProviderProps {
  children: ReactNode;
}
