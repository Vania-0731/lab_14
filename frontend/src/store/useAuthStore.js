import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null,

      login: (data) =>
        set({ usuario: data }),       

      logout: () =>
        set({ usuario: null }),
    }),
    {
      name: 'auth',      
    }
  )
)
