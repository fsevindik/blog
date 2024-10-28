import { IconProps } from "../types/types";

const SmileIcon = ({
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 24,
  color = "currentColor",
}: IconProps) => (
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
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5-7c-.552 0-1-.447-1-1 0-1.657-2.343-3-5-3s-5 1.343-5 3c0 .553-.447 1-1 1s-1-.447-1-1c0-2.762 3.134-5 7-5s7 2.238 7 5c0 .553-.447 1-1 1zm-7-6c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm6 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z" />
  </svg>
);

export default SmileIcon;
