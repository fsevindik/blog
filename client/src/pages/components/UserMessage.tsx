import axios from "axios";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const sender = localStorage.getItem("userId");
  const recipient = localStorage.getItem("userName");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    if (!sender) {
      toast.error("Sender information is missing");
      setSending(false);
      return;
    }

    if (!recipient) {
      toast.error("Recipient information is missing");
      setSending(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://serverfilmolog.onrender.com/messages/sendmessage",
        {
          sender,
          recipient,
          content,
        }
      );
      console.log("Message sent:", response.data);
      toast.success("Message sent successfully 👌");
      setContent("");
      setIsOpen(false);
    } catch (error: any) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to send message: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md mb-4 shadow-md"
        onClick={() => setIsOpen(true)}
      >
        Send Message
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div
            ref={ref}
            className="bg-white rounded-md shadow-md p-4 max-w-xs md:max-w-md w-full"
          >
            <div className="flex justify-end">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
              Send a Message to {recipient}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                id="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
                style={{ color: "black" }}
              />
              <button
                type="submit"
                className={`bg-black text-white py-2 px-4 rounded-md w-full ${
                  sending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-600"
                }`}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserMessage;
