import React, { useCallback, useEffect, useRef, useState } from "react";
import { WishItem } from "../../icons/types";
import ListIcon from "../../icons/ListIcon ";

const API_URL = "https://serverfilmolog.onrender.com"; 

const WishList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [isFilmolog, setIsFilmolog] = useState(false);
  const wishListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUsername = () => {
      const storedUsername = localStorage.getItem("userName");
      setIsFilmolog(storedUsername === "filmolog");
    };
    checkUsername();
    window.addEventListener("storage", checkUsername);
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
      window.removeEventListener("storage", checkUsername);
    };
  }, []);

  const toggleWishList = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewWish(e.target.value);
    },
    []
  );

  const handleAddWish = useCallback(async () => {
    if (newWish.trim()) {
      try {
        const response = await fetch(`${API_URL}/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filmTitle: newWish.trim() }),
        });

        if (!response.ok) {
          throw new Error('Failed to add wish');
        }

        const data = await response.json();
        setWishList((prev) => [...prev, data]);
        setNewWish('');
      } catch (error) {
        console.error('Error adding wish:', error);
      }
    }
  }, [newWish]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddWish();
      }
    },
    [handleAddWish]
  );

  const handleToggleAdded = useCallback(async (id: string) => {
    try {
      const updatedWish = wishList.find((wish) => wish.id === id);
      if (updatedWish) {
        const response = await fetch(`${API_URL}/wishlist/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: updatedWish.added ? 'pending' : 'added' }),
        });

        if (!response.ok) {
          throw new Error('Failed to update wish');
        }

        const data = await response.json();
        setWishList((prev) =>
          prev.map((wish) => (wish.id === id ? data : wish))
        );
      }
    } catch (error) {
      console.error('Error updating wish:', error);
    }
  }, [wishList]);

  return (
    <div className="fixed top-2 left-2 z-50" ref={wishListRef}>
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
              {wishList.map(({ id, text, added }) => (
                <li
                  key={id}
                  className="bg-gray-700 p-2 rounded break-words border-l-4 border-yellow-500 flex items-center justify-between"
                >
                  <span>{text}</span>
                  <button
                    className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                      added ? "bg-green-500" : "bg-red-500"
                    } ${isFilmolog ? "cursor-pointer" : "cursor-not-allowed"}`}
                    onClick={() => isFilmolog && handleToggleAdded(id)}
                    disabled={!isFilmolog}
                  />
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
