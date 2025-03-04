import { IconProps } from "../types/types";

const ListIcon = (props: IconProps) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      className={`w-4 h-4  m-1 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="4" cy="16" r="2" />
    </svg>
  );
};

export default ListIcon;
