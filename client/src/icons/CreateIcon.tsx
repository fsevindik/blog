import React from "react";
import { IconProps } from "./types";

const CreateIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      className={`w-6 h-6 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
    </svg>
  );
};

export default CreateIcon;
