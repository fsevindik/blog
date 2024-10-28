import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Message } from "../../types/types";

interface AdminMessageBoxProps {
  adminId: string;
}

const API_URL = "https://serverfilmolog.onrender.com";

const AdminMessageBox: React.FC<AdminMessageBoxProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/admin/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/messages/delete/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <div className="flex-grow overflow-auto p-2 sm:p-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className="p-3 sm:p-4 my-2 rounded bg-gray-900 border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="w-full sm:w-4/5">
                <div className="text-xs sm:text-sm text-gray-400">
                  <strong>{message.sender.name}</strong> -{" "}
                  {dayjs(message.sentAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div className="mt-2 text-sm sm:text-lg break-words">
                  {message.content}
                </div>
              </div>
              <button
                onClick={() => handleDelete(message._id)}
                className="mt-2 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-700"
                title="Delete message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
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
