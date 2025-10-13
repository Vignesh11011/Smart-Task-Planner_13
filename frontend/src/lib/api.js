import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const api = axios.create({ baseURL: API_BASE + '/api' });

export function setAuthToken(token){
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default api;
