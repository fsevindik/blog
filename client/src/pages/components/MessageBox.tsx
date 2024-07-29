import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:3000";

interface Message {
  _id: string;
  sender: string;
  content: string;
  sentAt: string;
}

interface MessageBoxProps {
  userId: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log("MessageBox mounted, userId:", userId);
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/${userId}`);
      console.log("Fetched messages:", response.data);

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
      const response = await axios.post(`${API_URL}/messages`, {
        userId,
        content: newMessage,
      });
      console.log("Message sent:", response.data);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("Rendering MessageBox, messages:", messages);

  return (
    <div className="flex flex-col h-full bg-gray-700">
      <div className="flex-grow overflow-auto p-2">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`p-1 my-2 rounded ml-auto w-3/5 font-extralight ${
                message.sender === userId
                  ? "bg-blue-500 self-end"
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
      <div className="flex p-2 bg-slate-200">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow p-2 rounded bg-white text-black mr-2 mb-10 min-h-20 shadow-lg"
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded p-2 mt-2 h-16 w-15 hover:bg-red-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
