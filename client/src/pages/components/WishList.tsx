import React, { useEffect, useRef, useState } from "react";
import ListIcon from "../../icons/ListIcon ";

const WishList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [wishList, setWishList] = useState<string[]>([]);
  const wishListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wishListRef.current &&
        !wishListRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddWish();
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50" ref={wishListRef}>
      <button
        onClick={toggleWishList}
        className={`bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 ${
          !isOpen ? "animate-pulse" : ""
        } w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
        aria-label="Toggle Wish List"
      >
        <ListIcon className="text-gray-900" size={4} />
      </button>
      {isOpen && (
        <div className="mt-2 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full sm:w-80 max-h-[80vh] overflow-y-auto border border-yellow-500">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Wish List
          </h3>
          {wishList.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {wishList.map((wish, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-2 rounded break-words border-l-4 border-yellow-500"
                >
                  {wish}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm mb-4 text-gray-400">Add some films!</p>
          )}
          <div className="flex flex-col">
            <input
              type="text"
              value={newWish}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Add a film"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
            />
            <button
              onClick={handleAddWish}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-2 rounded w-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
