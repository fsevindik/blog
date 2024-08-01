import React from "react";
import XIcon from "../icons/XIcon";

interface MessageBarProps {
  show: boolean;
  onClose: () => void;
}

const MessageBar: React.FC<MessageBarProps> = ({ show, onClose }) => {
  return (
    <div
      className={`fixed bottom-0 right-0 w-full max-w-md h-64 bg-gray-300 shadow-lg transition-transform transform ${
        show ? "translate-y-0" : "translate-y-full"
      } md:w-80 md:h-60 lg:w-96 lg:h-72`}
    >
      <button
        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <XIcon className="h-6 w-6" size={3} />
      </button>
      <div className="p-4 text-black font-serif">
        <p>Your messages here</p>
      </div>
      <div className="text-black">
        <textarea name="" id="" className="tetx-black font-cursive"></textarea>
      </div>
    </div>
  );
};

export default MessageBar;
