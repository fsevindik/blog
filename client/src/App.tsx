import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./componenets/Header/Header";
import { useAuth } from "./context/AuthContext";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth/Auth";
import Footer from "./pages/components/Footer";
import MessageBarContainer from "./pages/components/MessageBarContainer";
import Trends from "./pages/components/Trends";
import CreateFilms from "./pages/CreateFilm";
import DeleteFilm from "./pages/DeleteFilm";
import EditFilm from "./pages/EditFilm";
import Home from "./pages/Home";
import RelatedFilms from "./pages/ShowFilm/RelatedFilm";
import ShowFilm from "./pages/ShowFilm/ShowFilm";
import WelcomePage from "./pages/WelcomePage";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-lg text-white text-center">
      <Header user={user} />
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
          <Route path="/actor/:actorName" element={<RelatedFilms />} />
          {user?.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
        </Routes>
      </div>
      <Footer />
      {user?.role === "visitor" && user?.id && (
        <MessageBarContainer userId={user.id} />
      )}
    </div>
  );
};

export default App;
