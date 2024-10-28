import { useState, useCallback, useEffect } from 'react';
import { WishItem } from '../types/types';

const API_URL = "https://serverfilmolog.onrender.com";

export const useWishList = () => {
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [isFilmolog, setIsFilmolog] = useState(false);

  const fetchWishList = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/wishlist`);
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      const data = await response.json();
      setWishList(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, []);

  const checkUsername = useCallback(() => {
    const storedUsername = localStorage.getItem("userName");
    setIsFilmolog(storedUsername === "filmolog");
  }, []);

  const handleAddWish = useCallback(async (newWish: string) => {
    if (newWish.trim()) {
      try {
        const response = await fetch(`${API_URL}/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newWish.trim() }),
        });

        if (!response.ok) throw new Error('Failed to add wish');
        const data = await response.json();
        setWishList(prev => [...prev, data]);
        return true;
      } catch (error) {
        console.error('Error adding wish:', error);
        return false;
      }
    }
    return false;
  }, []);

  const handleToggleAdded = useCallback(async (id: string) => {
    try {
      const wishItem = wishList.find(wish => wish.id === id);
      if (wishItem) {
        const newAdded = !wishItem.added;
        const newStatus = newAdded ? 'approved' : 'pending';
        
        const response = await fetch(`${API_URL}/wishlist/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            added: newAdded,
            status: newStatus
          }),
        });

        if (!response.ok) throw new Error('Failed to update wish');
        const data = await response.json();
        setWishList(prev => prev.map(wish => (wish.id === id ? data : wish)));
      }
    } catch (error) {
      console.error('Error updating wish:', error);
    }
  }, [wishList]);

  useEffect(() => {
    checkUsername();
    fetchWishList();
    window.addEventListener("storage", checkUsername);
    
    return () => {
      window.removeEventListener("storage", checkUsername);
    };
  }, [checkUsername, fetchWishList]);

  return {
    wishList,
    isFilmolog,
    handleAddWish,
    handleToggleAdded
  };
};