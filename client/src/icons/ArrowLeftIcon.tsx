import { IconProps } from "../types/types";

const ArrowLeftIcon = (props: IconProps) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 hover:scale-110 ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
};

export default ArrowLeftIcon;
