interface IconProps {
  className?: string;
}

const AddBoxIcon = (props: IconProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`text-yellow-500 text-4xl animate-bounce hover:scale-110 transition-transform hover:text-white ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
};

export default AddBoxIcon;
