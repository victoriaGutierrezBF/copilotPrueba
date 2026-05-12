import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({ baseURL: BASE_URL });

export async function loginRequest(username, password) {
  const { data } = await api.post('/token', { username, password });
  return data;
}

export async function refreshTokenRequest(refreshToken) {
  const { data } = await api.post('/token/refresh', { refresh_token: refreshToken });
  return data;
}
