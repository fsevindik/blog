import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./componenets/Header/Header";
import MessageBar from "./componenets/MessageBar";
import AddBoxIcon from "./icons/AddBoxIcon";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth/Auth";
import CreateFilms from "./pages/CreateFilm";
import DeleteFilm from "./pages/DeleteFilm";
import EditFilm from "./pages/EditFilm";
import Home from "./pages/Home";
import ShowFilm from "./pages/ShowFilm/ShowFilm";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./pages/components/Footer";
import Trends from "./pages/components/Trends";
import { checkUserAuth } from "./utils/auth";

const App: React.FC = () => {
  const [showMessageBar, setShowMessageBar] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Kullanıcı oturum durumunu kontrol et
    const authStatus = checkUserAuth();
    setIsAuthenticated(authStatus);
  }, []);

  const handleToggleMessageBar = () => {
    setShowMessageBar(!showMessageBar);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-lg text-white text-center">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films/create" element={<CreateFilms />} />
          <Route path="/films/details/:id" element={<ShowFilm />} />
          <Route path="/films/edit/:id" element={<EditFilm />} />
          <Route path="/films/delete/:id" element={<DeleteFilm />} />
          <Route path="/films/trends" element={<Trends />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />

      {isAuthenticated && (
        <>
          <div className="fixed bottom-5 right-5 z-50">
            <button
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
              onClick={handleToggleMessageBar}
            >
              <AddBoxIcon />
            </button>
          </div>

          <MessageBar show={showMessageBar} onClose={handleToggleMessageBar} />
        </>
      )}
    </div>
  );
};

export default App;
