import React from "react";
import { IconProps } from "./types";

const ThumbsUpIcon: React.FC<IconProps> = ({
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 24,
  color = "currentColor",
}) => (
  <svg
    className={`cursor-pointer ${className}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <path d="M14 0H6C4.89 0 4 0.9 4 2V12C4 13.1 4.89 14 6 14H14C14.28 14 14.53 13.94 14.76 13.84L19.77 16.54C20.09 16.72 20.5 16.63 20.69 16.31C20.85 16.06 20.85 15.73 20.69 15.47L18.01 11H21C21.55 11 22 10.55 22 10V7C22 6.45 21.55 6 21 6H14.82L16.58 1.76C16.77 1.31 16.56 0.79 16.12 0.58C15.92 0.48 15.69 0.43 15.47 0.43L14 0ZM2 12H0V22H2V12Z" />
  </svg>
);

export default ThumbsUpIcon;
