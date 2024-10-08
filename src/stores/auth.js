// stores/authStore.js
import { defineStore } from 'pinia';
import api from '../axios.js';  // Axios configurado

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/paciente/login', credentials);
        this.setToken(response.data.token);
        return response.data;
      } catch (error) {
        console.error("Error en login:", error);
        throw error;
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);  // Guarda el token en localStorage
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');  // Elimina el token de localStorage
    },
  },
});
