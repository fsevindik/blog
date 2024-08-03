import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../../icons/types";

const API_URL = "https://serverfilmolog.onrender.com";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>(`${API_URL}/users`);
        setUsers(data);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchUsers();
    const intervalId = setInterval(fetchUsers, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="md:w-1/2 lg:w-1/3 sm:w-full bg-gray-600">
      <h2 className="text-2xl font-semibold mb-4 border-b">Users</h2>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-2 rounded-lg shadow-md flex items-center"
          >
            <div className="flex items-center space-x-5">
              <span
                className={`mr-2 ${
                  user.online ? "text-green-500" : "text-red-500"
                }`}
              >
                &#x25cf;
              </span>
              <p className="text-sm font-medium text-yellow-500">
                {user.name} -----{" "}
              </p>
            </div>
            <p className="text-sm text-white ml-auto">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
