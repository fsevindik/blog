import React, { ReactNode } from "react";
import videoSource from "../../assets/cinema.mp4";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden ">
      <video
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full min-h-full max-w-none"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
