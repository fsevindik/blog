import React, { useState } from "react";
import AddBoxIcon from "../../icons/AddBoxIcon";
import AdminIcon from "../../icons/AdminIcon ";
import MessageBox from "./MessageBox";

interface MessageBarContainerProps {
  userId: string;
}

const MessageBarContainer: React.FC<MessageBarContainerProps> = ({
  userId,
}) => {
  const [showMessageBar, setShowMessageBar] = useState(false);

  const toggleMessageBar = () => {
    setShowMessageBar(!showMessageBar);
    console.log("Message bar toggled:", !showMessageBar);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          onClick={toggleMessageBar}
        >
          <AddBoxIcon />
        </button>
      </div>

      {showMessageBar && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden h-96">
          <div className="bg-red-600 text-white p-2 flex justify-between ">
            <div className="flex items-center mx-auto">
              <h3 className="mb-auto">
                Direct Line to
                <AdminIcon />
              </h3>
            </div>
            <button onClick={toggleMessageBar}>&times;</button>
          </div>
          <div className="p-2 h-full overflow-y-auto">
            <MessageBox userId={userId} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBarContainer;
