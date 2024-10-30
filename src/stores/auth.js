// stores/authStore.js
import { defineStore } from 'pinia';
import api from '../axios.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null, 
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/paciente/login', credentials);
        this.setToken(response.data.token);
        this.setUsername(response.data.paciente.username);
        return response.data;
      } catch (error) {
        console.error("Error en login:", error);
        throw error;
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUsername(username) {
      this.username = username;
      localStorage.setItem('username', username);  
    },
    logout() {
      this.token = null;
      this.username = null;  
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});
