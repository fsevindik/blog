import { Route, Routes } from "react-router-dom";
import Header from "./componenets/Header/Header";

const App: React.FC = () => {
  return (
    <div className="bg-gray-700 text-lg text-white text-center">
      <Header />
      <Routes>
        <Route />
      </Routes>
    </div>
  );
};

export default App;
