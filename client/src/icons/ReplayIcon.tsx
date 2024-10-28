import { IconProps } from "../types/types";

const ReplayIcon = ({
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
    <path d="M12 5V1L8 5l4 4V7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5H5c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z" />
  </svg>
);

export default ReplayIcon;
