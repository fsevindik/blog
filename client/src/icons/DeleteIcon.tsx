import { IconProps } from "./types";

const DeleteIcon = (props: IconProps) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      className={`w-6 h-6 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <path d="M3 6h18M9 6v12M15 6v12M4 6l1 14h10l1-14H4z" />
    </svg>
  );
};

export default DeleteIcon;
