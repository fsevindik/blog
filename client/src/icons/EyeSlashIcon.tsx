import { IconProps } from "./types";

const EyeSlashIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-5 w-5 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7A10.05 10.05 0 014.28 8.245m2.119-1.354A9.975 9.975 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.975 9.975 0 01-1.282 3.705M15 12a3 3 0 01-6 0 3 3 0 016 0zm-9 0a9.975 9.975 0 003.879 7.755M3 3l18 18"
      />
    </svg>
  );
};

export default EyeSlashIcon;
