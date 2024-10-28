import { IconProps } from "../types/types";

const EditIcon = (props: IconProps) => {
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
      <path d="M14.7 2.3c-1.1-1.1-2.8-1.1-3.9 0L8 5.1c-1 1-1.2 2.5-.7 3.7L2.7 13.4c-.6.6-.6 1.5 0 2.1L3 16.8c.6.6 1.5.6 2.1 0l4.7-4.7c1.2.5 2.7.3 3.7-.7l2.9-2.8c1.1-1.1 1.1-2.8 0-3.9L14.7 2.3zM3 21h18v2H3z" />
    </svg>
  );
};

export default EditIcon;
