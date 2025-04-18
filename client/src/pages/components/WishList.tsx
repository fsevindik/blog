import React, { useCallback, useEffect, useRef, useState } from "react";
import { WishListItem } from "./WishListItem";
import { useWishList } from "../../hooks/useWishList";
import ListIcon from "../../icons/ListIcon ";

const WishList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState("");
  const wishListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { wishList, isFilmolog, handleAddWish, handleToggleAdded } = useWishList();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      wishListRef.current &&
      !wishListRef.current.contains(event.target as Node) &&
      inputRef.current !== event.target
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const toggleWishList = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWish(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    const success = await handleAddWish(newWish);
    if (success) setNewWish("");
  }, [newWish, handleAddWish]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="relative" ref={wishListRef}>
      <button
        onClick={toggleWishList}
        className="bg-yellow-500  rounded-full hover:bg-white transition-all w-8 h-8 flex items-center justify-center focus:outline-none"
        aria-label="Toggle Wish List"
      >
        <ListIcon className="text-gray-900 size-6" size={4} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-72 max-h-[60vh] overflow-y-auto border border-yellow-500 z-50">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Wish List</h3>

          {wishList.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {wishList.map((item) => (
                <WishListItem key={item.id} {...item} isFilmolog={isFilmolog} onToggleAdded={handleToggleAdded} />
              ))}
            </ul>
          ) : (
            <p className="text-sm mb-4 text-gray-400">Add some films!</p>
          )}

          <div className="flex flex-col">
            <input
              type="text"
              ref={inputRef}
              value={newWish}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Add a film"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
            />
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-red-500 text-gray-900 p-2 rounded w-full text-sm font-semibold transition-colors duration-300 focus:outline-none"
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
