import { IconProps } from "../types/types";

const LinkedInIcon = ({
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
    <path d="M22.225 0H1.775C.796 0 0 .795 0 1.775v20.451C0 23.204.796 24 1.775 24h20.451c.98 0 1.775-.795 1.775-1.775V1.775C24 .795 23.205 0 22.225 0zm-15.336 20.452H4.259V9.189h2.63v11.263zM5.444 8.319c-.845 0-1.535-.691-1.535-1.537s.69-1.537 1.535-1.537c.846 0 1.536.692 1.536 1.537s-.69 1.537-1.536 1.537zM20.018 20.452h-2.629v-5.928c0-1.411-.028-3.227-1.968-3.227-1.969 0-2.274 1.54-2.274 3.12v6.035h-2.63V9.189h2.527v1.558h.036c.352-.66 1.21-1.357 2.491-1.357 2.666 0 3.159 1.76 3.159 4.067v6.615z" />
  </svg>
);

export default LinkedInIcon;
