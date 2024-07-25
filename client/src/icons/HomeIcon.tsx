import { IconProps } from "./types";

const HomeIcon = (props: IconProps) => {
  return (
    <svg
      className="w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 3l10 10v8H2v-8l10-10zm0 2.56L4.28 12H5v7h4v-4h2v4h4v-7h.72L12 5.56z" />
    </svg>
  );
};

export default HomeIcon;
