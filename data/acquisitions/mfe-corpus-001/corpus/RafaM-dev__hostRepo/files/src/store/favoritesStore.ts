import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoritesState } from '.';


export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (character) =>
        set((state) => ({
          favorites: [...state.favorites, character],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((char) => char.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((char) => char.id === id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);