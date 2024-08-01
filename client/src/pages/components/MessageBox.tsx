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

const MessageBox: React.FC<{ userId: string }> = ({ userId }) => {
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
      {/* ... Rest of your component code */}
    </div>
  );
};

export default MessageBox;
