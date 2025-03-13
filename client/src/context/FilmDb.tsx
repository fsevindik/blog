import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Film } from "../types/types";
import { FilmContextProps, FilmProviderProps } from "./type";

const FilmContext = createContext<FilmContextProps>({
  films: [],
  loading: false,
  error: null,
  search: "",
  handleSearch: () => {},
  fetchFilms: () => {},
});

export const FilmProvider: React.FC<FilmProviderProps> = ({ children }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const API_URL = "https://serverfilmolog.onrender.com/films";

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Film[]>(API_URL);
      setFilms(response.data);
    } catch (error) {
      console.error("Error fetching films:", error);
      setError("Failed to fetch films");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <FilmContext.Provider
      value={{ films, loading, error, search, handleSearch, fetchFilms }}
    >
      {children}
    </FilmContext.Provider>
  );
};

export default FilmContext;
