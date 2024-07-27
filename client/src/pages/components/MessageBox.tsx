import axios from "axios";
import React, { useEffect, useState } from "react";

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
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/getmessages/${userId}`);
      const fetchedMessages = response.data;

      if (Array.isArray(fetchedMessages)) {
        setMessages(fetchedMessages);
      } else {
        console.error(
          "Error: fetched messages are not an array",
          fetchedMessages
        );
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post("/api/messages/sendmessage", {
        sender: userId,
        recipient: "admin", // for now
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
      <div className="flex-grow overflow-auto p-2 ">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`p-2 my-2 rounded ${
                message.sender === userId
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200"
              }`}
            >
              {message.content}
            </div>
          ))
        ) : (
          <div>No messages</div>
        )}
      </div>
      <div className="flex p-2 bg-slate-200">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow p-2 rounded bg-white text-black mr-2 mb-10 min-h-20 shadow-lg "
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
