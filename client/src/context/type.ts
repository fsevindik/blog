import { ReactNode } from "react";
import { Film, User } from "../types/types";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface FilmContextProps {
  films: Film[];
  loading: boolean;
  error: string | null;
  search: string;
  handleSearch: (newSearch: string) => void;
  fetchFilms: () => void;
}

export interface FilmProviderProps {
  children: ReactNode;
}
