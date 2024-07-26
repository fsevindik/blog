import { IconProps } from "./types";

const FaThumbsUp = ({
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
    <path d="M14 1H5C3.9 1 3 1.9 3 3V14C3 15.1 3.9 16 5 16H10.75L10.31 19.36C10.23 19.96 10.46 20.56 10.92 21C11.27 21.32 11.73 21.5 12.22 21.5H14.5C15.33 21.5 16.09 21.1 16.5 20.38L20.75 13.5C20.91 13.24 21 12.93 21 12.62V10C21 8.34 19.66 7 18 7H16.72L17.83 3.36C17.96 2.94 17.89 2.5 17.64 2.16C17.39 1.83 16.99 1.65 16.57 1.65H14ZM5 3H14V5H5V3ZM14 15V9H18C18.55 9 19 9.45 19 10V12.62L14.25 19H12.22L13.06 15H14ZM5 7H12V15H5V7ZM14 17.92L15.59 15H14V17.92Z" />
  </svg>
);

export default FaThumbsUp;
