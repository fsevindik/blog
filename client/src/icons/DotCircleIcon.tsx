import { IconProps } from "./types";

const DotCircleIcon = (props: IconProps) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      {...otherProps}
    >
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 324c-41.355 0-76-33.645-76-76s33.645-76 76-76 76 33.645 76 76-33.645 76-76 76z" />
    </svg>
  );
};

export default DotCircleIcon;
