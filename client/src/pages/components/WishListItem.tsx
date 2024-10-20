import React from "react";
import { WishListItemProps } from "../../icons/types";

export const WishListItem: React.FC<WishListItemProps> = ({
    id,
    text,
    added,
    isFilmolog,
    onToggleAdded,
  }) => (
    <li className="bg-gray-700 p-2 rounded break-words border-l-4 border-yellow-500 flex items-center justify-between">
      <span>{text}</span>
      <button
        className={`w-4 h-4 rounded-full transition-colors duration-300 ${
          added ? "bg-green-500" : "bg-red-500"
        } ${isFilmolog ? "cursor-pointer" : "cursor-not-allowed"}`}
        onClick={() => isFilmolog && onToggleAdded(id)}
        disabled={!isFilmolog}
      />
    </li>
  );