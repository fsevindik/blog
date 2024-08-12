import React, { useState } from "react";

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
    <div className="fixed top-4 left-4 cursor-poin ">
      <button
        className="bg-yellow-600 animate-pulse hover:bg-gray-700 text-white p-2 rounded-full focus:outline-none"
        onClick={toggleWishList}
      >
        {isOpen ? "Clsoe" : "Wishlist"}
      </button>
      {isOpen && (
        <div className="mt-2 bg-white text-black p-2 rounded-lg shadow-lg w-48 sm:w-64">
          <h3 className="text-base font-semibold mb-2">Wish List</h3>
          <input
            type="text"
            value={newWish}
            onChange={handleInputChange}
            placeholder="Add a film"
            className="w-full p-1 border border-gray-300 rounded mb-2 text-sm"
          />
          <button
            onClick={handleAddWish}
            className="bg-gray-400 hover:bg-slate-700 text-white p-2 rounded w-full text-sm"
          >
            Add
          </button>
          <ul className="mt-4 space-y-1 text-sm">
            {wishList.map((wish, index) => (
              <li key={index} className="bg-gray-100 p-1 rounded">
                {wish}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WishList;
