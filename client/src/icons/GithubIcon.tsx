import { IconProps } from "./types";

const GitHubIcon = ({
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
    <path d="M12 2.5c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.49v-1.74c-2.77.6-3.35-1.34-3.35-1.34-.45-1.14-1.1-1.44-1.1-1.44-.91-.62.07-.61.07-.61 1.01.07 1.53 1.05 1.53 1.05.9 1.53 2.35 1.09 2.92.84.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.66-.33 2.52-.33s1.72.11 2.52.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.58 4.93.36.31.68.93.68 1.88v2.8c0 .27.18.58.68.49 3.97-1.33 6.84-5.07 6.84-9.49 0-5.52-4.48-10-10-10z" />
  </svg>
);

export default GitHubIcon;
