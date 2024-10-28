import { IconProps } from "../types/types";

const XIcon = (props: IconProps) => {
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
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default XIcon;
