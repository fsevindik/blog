import { Link } from "react-router-dom";
import AdminIcon from "../icons/AdminIcon ";

const Admin = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-yellow-500">
          Welcome, Sir yes Sir
          <span className="ml-2">
            <AdminIcon />
          </span>
        </h1>
        <p className="mt-2 text-white">You got work to do...🫡</p>
      </div>
      <div className="flex justify-center">
        <Link to="/">
          <div className="bg-red-600 w-48 hover:bg-red-700 text-white py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105">
            <p className="text-xl font-semibold">Manage Books</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
