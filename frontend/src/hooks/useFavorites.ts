import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ecofinds_favorites');
    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    const favoritesArray = Array.from(favorites);
    localStorage.setItem('ecofinds_favorites', JSON.stringify(favoritesArray));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(productId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.has(productId);
  };

  const clearFavorites = () => {
    setFavorites(new Set());
    toast.success('Cleared all favorites');
  };

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount: favorites.size
  };
};