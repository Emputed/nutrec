// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://express-nutrec.onrender.com/api/v1',
});

export default api;