import React, { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => (
  <div
    className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url('https://wallpapercave.com/wp/wp4016036.jpg')`,
    }}
  >
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      {children}
    </div>
  </div>
);

export default AuthContainer;
