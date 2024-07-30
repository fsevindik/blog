import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader size={100} color={"#fffff"} loading={true} />
      <span className="tetx-xs">Loading...</span>
    </div>
  );
};

export default Spinner;
