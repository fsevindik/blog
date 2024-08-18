import React, { useState } from "react";
import ListIcon from "../../icons/ListIcon ";

const WishList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [wishList, setWishList] = useState<string[]>([]);

  const toggleWishList = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWish(e.target.value);
  };

  const handleAddWish = () => {
    if (newWish.trim()) {
      setWishList([...wishList, newWish]);
      setNewWish("");
    }
  };

  return (
    <div className="absolute top-4 left-4 cursor-pointer z-50">
      <div className="flex items-center mb-2">
        <div
          onClick={toggleWishList}
          className={`bg-gray-500 p-2 rounded-full hover:bg-gray-700 ${
            !isOpen ? "animate-pulse" : ""
          } w-12 h-12 flex items-center justify-center mr-2`}
        >
          <ListIcon className="text-white" size={4} />
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 bg-slate-400 text-black p-2 rounded-lg shadow-lg w-64">
          <h3 className="text-base font-semibold mb-2">Wish List</h3>
          <ul className="mt-4 space-y-1 text-sm">
            {wishList.map((wish, index) => (
              <li key={index} className="bg-yellow-400 p-1 rounded">
                {wish}
              </li>
            ))}
          </ul>
          <div className="flex">
            <input
              type="text"
              value={newWish}
              onChange={handleInputChange}
              placeholder="Add a film"
              className="w-full p-2 m-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <button
            onClick={handleAddWish}
            className="bg-gray-500 hover:bg-yellow-600 text-white p-2 rounded w-full text-sm"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default WishList;
