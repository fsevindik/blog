import React, { useState } from "react";
import AddBoxIcon from "../../icons/AddBoxIcon";
import MessageBar from "./MessageBar";

interface MessageBarContainerProps {
  userId: string;
}

const MessageBarContainer: React.FC<MessageBarContainerProps> = ({
  userId,
}) => {
  const [showMessageBar, setShowMessageBar] = useState(false);

  const handleToggleMessageBar = () => setShowMessageBar(!showMessageBar);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          onClick={handleToggleMessageBar}
        >
          <AddBoxIcon />
        </button>
      </div>

      <MessageBar
        show={showMessageBar}
        onClose={handleToggleMessageBar}
        userId={userId}
      />
    </>
  );
};

export default MessageBarContainer;
