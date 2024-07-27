import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./componenets/Header/Header";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth/Auth";
import CreateFilms from "./pages/CreateFilm";
import DeleteFilm from "./pages/DeleteFilm";
import EditFilm from "./pages/EditFilm";
import Home from "./pages/Home";
import ShowFilm from "./pages/ShowFilm/ShowFilm";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./pages/components/Footer";
import MessageBarContainer from "./pages/components/MessageBarContainer";
import Trends from "./pages/components/Trends";

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    console.log("Stored UserId:", storedUserId);
    console.log("Stored UserName:", storedUserName);

    if (storedUserId && storedUserName) {
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-lg text-white text-center">
      <Header user={undefined} />
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

      {userId && userName && (
        <>
          <MessageBarContainer userId={userId} />
          {console.log("MessageBarContainer Rendered")}
        </>
      )}
    </div>
  );
};

export default App;
