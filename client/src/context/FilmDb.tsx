import { createContext, ReactNode, useState } from "react";

interface FilmContextProps {
  search: string;
  handleSearch: (newSearch: string) => void;
}

interface FilmProviderProps {
  children: ReactNode;
}

const FilmContext = createContext<FilmContextProps>({
  search: "",
  handleSearch: () => {},
});

export const FilmProvider: React.FC<FilmProviderProps> = ({ children }) => {
  const initialState = {
    search: "",
  };

  const [search, setSearch] = useState(initialState.search);

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <FilmContext.Provider value={{ search, handleSearch }}>
      {children}
    </FilmContext.Provider>
  );
};

export default FilmContext;
