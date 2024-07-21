import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { FilmProvider } from "./context/FilmDb.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FilmProvider>
      <App />
    </FilmProvider>
  </BrowserRouter>
);
