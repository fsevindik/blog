import { IconProps } from "../types/types";

const DoctorIcon = (props: IconProps) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M4 16h16" />
      <path d="M12 11v7" />
    </svg>
  );
};

export default DoctorIcon;
