// stores/authStore.js
import { defineStore } from 'pinia';
import api from '../axios.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null, 
    status : parseInt(localStorage.getItem('status')) || null,
    id : localStorage.getItem('id') || null,
    flag: localStorage.getItem('flag') === "true" ? true : false,
    role: localStorage.getItem('role') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/paciente/login', credentials);
        this.setToken(response.data.token);
        this.setUsername(response.data.paciente.username);
        this.setStatus(response.data.paciente.status);
        this.setId(response.data.paciente.id);
        this.setFlag(true);
        if (this.status === 1) {
          this.setRole("nutriologa");
        } else {
          this.setRole("paciente");
        }
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
    setStatus(status){
      this.status = status;
      localStorage.setItem('status', status);
    },
    setId(id){
      this.id = id;
      localStorage.setItem('id', id);
    },
    setFlag(flag){
      this.flag = flag;
      localStorage.setItem('flag', flag);
    },
    setRole(role){
      this.role = role;
      localStorage.setItem('role', role);
    },
    logout() {
      this.id = null;
      this.token = null;
      this.username = null;  
      this.flag = null;
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('flag');
      localStorage.removeItem('role');
    },
  },
});
