interface AverageIconProps {
  rating: number;
  className?: string;
}

const AverageIcon = ({ rating, className }: AverageIconProps) => {
  return (
    <div
      className={`flex items-center border-2 border-gray-700 p-2 rounded-md bg-blue-500 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
        className="text-yellow-400"
      >
        <path d="M12 2l2.45 4.95L20 8.1l-3.55 3.45L17.9 16 12 13.1 6.1 16l1.45-4.45L4 8.1l5.55-.15L12 2z" />
      </svg>
      <span className="ml-2 font-bold text-white">{rating} /10</span>
    </div>
  );
};

export default AverageIcon;
