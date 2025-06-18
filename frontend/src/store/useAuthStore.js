import { create } from 'zustand'
import { loginService } from "../services/LoginServices";

const useAuthStore = create((set) => ({
    usuario: JSON.parse(localStorage.getItem("usuario")) || null,
    login: async (usuarioData) => {
        try {
            const data = await loginService(usuarioData.username, usuarioData.password);
            set({ usuario: data });
            localStorage.setItem("usuario", JSON.stringify(data)); 
        } catch (error) {
            console.error("Error al hacer login:", error);
            set({ usuario: null });
        }
    },
    logout: () => {
        set({ usuario: null });
        localStorage.removeItem("usuario");
    }
}));

export { useAuthStore };
