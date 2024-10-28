import { IconProps } from "../types/types";

const CheckCircleIcon = (props: IconProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
    >
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-142.686-54.627l-184 184c-4.686 4.686-12.284 4.686-16.97 0l-104-104c-4.686-4.686-4.686-12.284 0-16.97l28.284-28.284c4.686-4.686 12.284-4.686 16.97 0L176 305.942l147.314-147.313c4.686-4.686 12.284-4.686 16.97 0l28.284 28.284c4.686 4.686 4.686 12.284 0 16.97z" />
    </svg>
  );
};

export default CheckCircleIcon;
