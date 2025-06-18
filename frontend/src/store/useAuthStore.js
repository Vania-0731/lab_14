import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  usuario: JSON.parse(localStorage.getItem('usuario')) || null,

  login: (userData) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    set({ usuario: userData });
  },

  logout: () => {
    localStorage.removeItem('usuario');
    set({ usuario: null });
  }
}));
