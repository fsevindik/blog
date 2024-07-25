import { IconProps } from "./types";

const MessageIcon = (props: IconProps) => {
  return (
    <svg
      className="w-7 h-7 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm1 3l8 5 8-5m-8 5v6" />
    </svg>
  );
};

export default MessageIcon;
