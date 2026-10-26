// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This creates your global store.
// `set` is a function to update the store's state.
// `persist` is a middleware that automatically saves the store's state
// to localStorage, so the user stays logged in after a page refresh.

export const useAuthStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      token: null,          // To store the JWT
      user: null,           // To store the logged-in user's profile data
      isAuthenticated: false, // A simple boolean flag for quick checks

      // --- ACTIONS ---
      // Action to set the state after a successful login
      login: (token, user) => set({
        token,
        user,
        isAuthenticated: true,
      }),

      // Action to clear the state on logout
      logout: () => set({
        token: null,
        user: null,
        isAuthenticated: false,
      }),

      // Optional: An action to update user info without re-logging in
      // (e.g., after they update their profile)
      setUser: (user) => set((state) => ({
        ...state,
        user: { ...state.user, ...user },
      })),
    }),
    {
      name: 'auth-storage', // The key used for localStorage. Don't change this later.
    }
  )
);