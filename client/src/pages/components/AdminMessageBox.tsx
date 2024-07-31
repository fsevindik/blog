import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:3000";

interface Message {
  _id: string;
  sender: { _id: string; name: string };
  content: string;
  sentAt: string;
}

const AdminMessageBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/admin/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/messages/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Kullanıcı bilgileri yükleniyor
  }

  if (user.role !== "admin") {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <div className="flex-grow overflow-auto p-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className="p-4 my-2 rounded bg-gray-900 border border-gray-700 flex justify-between items-center"
            >
              <div>
                <div className="text-sm text-gray-400">
                  <strong>{message.sender.name}</strong> -{" "}
                  {dayjs(message.sentAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div className="mt-2 text-lg">{message.content}</div>
              </div>
              <button
                onClick={() => handleDelete(message._id)}
                className="ml-4 text-red-500 hover:text-red-700"
                title="Delete message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-white">No messages yet</div>
        )}
      </div>
    </div>
  );
};

export default AdminMessageBox;
