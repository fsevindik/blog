import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:3000";

interface Message {
  _id: string;
  sender: string;
  content: string;
  sentAt: string;
}

const MessageBox: React.FC<{ userId: string }> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/${user!.id}`);
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(`${API_URL}/messages`, {
        userId: user!.id,
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-700">
      <div className="flex-grow overflow-auto p-2">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`rounded ${
                message.sender === user!.id
                  ? "bg-blue-500 self-end text-white"
                  : "bg-gray-300"
              }`}
            >
              {message.content}
            </div>
          ))
        ) : (
          <div className="text-white">No messages yet</div>
        )}
      </div>
      <div className="flex mb-10 p-1 bg-slate-200">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message to filmolog  like:      dear admin you should add that movies too   --The Island-- "
          className="flex-grow p-5 rounded bg-white text-black mr-2 min-h-20 shadow-lg "
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded p-2 h-16 w-15 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
