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
        className={`bg-gray-500 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 ${
          !isOpen ? "animate-pulse" : ""
        } w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
        aria-label="Toggle Wish List"
      >
        <ListIcon className="text-white" size={4} />
      </button>
      {isOpen && (
        <div className="mt-2 bg-slate-400 text-black p-4 rounded-lg shadow-lg w-full sm:w-80 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Wish List</h3>
          {wishList.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {wishList.map((wish, index) => (
                <li
                  key={index}
                  className="bg-yellow-400 p-2 rounded break-words"
                >
                  {wish}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm mb-4">Add some films!</p>
          )}
          <div className="flex flex-col">
            <input
              type="text"
              value={newWish}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Add a film"
              className="w-full p-2 mb-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={handleAddWish}
              className="bg-gray-500 hover:bg-yellow-600 text-white p-2 rounded w-full text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
