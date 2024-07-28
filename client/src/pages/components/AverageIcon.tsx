const AverageIcon = ({ rating }) => {
  return (
    <div className="border-2 border-gray-700 p-1 rounded-md bg-blue-500">
      <span className="text-bold ">⭐️</span>
      <span className="font-bold">{rating} /10</span>
    </div>
  );
};

export default AverageIcon;
