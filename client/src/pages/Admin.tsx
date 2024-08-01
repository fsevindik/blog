import { useState } from "react";
import { Link } from "react-router-dom";
import AdminIcon from "../icons/AdminIcon ";
import AdminMessageBox from "./components/AdminMessageBox";
import UserList from "./components/UserList ";

const ADMIN_ID = "66a0e182a8e577dcb198e92c";

const Admin: React.FC = () => {
  const [showMessageBar, setShowMessageBar] = useState(false);

  const toggleMessageBar = () => {
    setShowMessageBar(!showMessageBar);
  };

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
      <div className="flex justify-center mb-4">
        <Link to="/">
          <div className="bg-red-600 w-48 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105">
            <p className="text-xl font-semibold">Manage Films</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          onClick={toggleMessageBar}
        >
          <span className="text-xl">Messages</span>
        </button>
      </div>
      {showMessageBar && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden h-96">
          <div className="bg-red-600 text-white p-2 flex justify-between items-center">
            <div className="flex items-center mx-auto">
              <h3>
                Direct Line to
                <AdminIcon />
              </h3>
            </div>
            <button onClick={toggleMessageBar}>&times;</button>
          </div>
          <div className="p-2 h-full overflow-y-auto">
            <AdminMessageBox adminId={ADMIN_ID} />
          </div>
        </div>
      )}
      <div className="w-full p-4">
        <UserList />
      </div>
    </div>
  );
};

export default Admin;
