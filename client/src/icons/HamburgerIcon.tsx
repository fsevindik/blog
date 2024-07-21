import React from "react";
import { IconProps } from "./types";

const HamburgerIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={`w-6 h-6 ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

export default HamburgerIcon;
