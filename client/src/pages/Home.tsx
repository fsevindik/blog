import { Link } from "react-router-dom";
import AddBoxIcon from "../icons/AddBoxIcon";
import FilmsTable from "./components/FilmTable";

const Home = () => {
  return (
    <div>
      <div>
        <Link
          to="/films/create"
          className="text-yellow-500 h-8 w-8  ml-auto hover:text-white  flex items-center"
        >
          <AddBoxIcon />
        </Link>
      </div>
      <FilmsTable />
    </div>
  );
};

export default Home;
