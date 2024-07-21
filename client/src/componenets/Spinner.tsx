import React from "react";
import { BounceLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BounceLoader size={100} color={"#333abc"} loading={true} />
    </div>
  );
};

export default Spinner;
