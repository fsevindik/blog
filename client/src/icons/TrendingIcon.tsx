import { IconProps } from "./types";

const TrendingIcon = ({
  className,
  color = "currentColor",
  width = "24",
  height = "24",
  cursor,
  fontSize,
  visibility,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IconProps) => (
  <svg
    className={className}
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor, fontSize, visibility }}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <path
      d="M3 17l6-6 4 4 8-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 7h7v7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TrendingIcon;
