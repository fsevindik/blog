import React from "react";

interface IconProps {
  className?: string;
}

const DotCircleIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
    >
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 324c-41.355 0-76-33.645-76-76s33.645-76 76-76 76 33.645 76 76-33.645 76-76 76z" />
    </svg>
  );
};

export default DotCircleIcon;
