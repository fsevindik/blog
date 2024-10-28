import { IconProps } from "../types/types";

const StarIcon = ({
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IconProps) => (
  <svg
    className={`cursor-pointer ${className}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.898 1.482 8.218L12 18.813 4.582 23.422l1.482-8.218L0 9.306l8.332-1.151L12 .587z" />
  </svg>
);

export default StarIcon;
