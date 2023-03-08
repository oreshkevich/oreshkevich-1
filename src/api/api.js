import axios from 'axios';

const API = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/',
});

API.interceptors.request.use((request) => {
  const tokenLocalStorage = localStorage.getItem('token');

  if (tokenLocalStorage && request.headers) {
    request.headers.Authorization = `Bearer ${tokenLocalStorage}`;
  }

  return request;
});

export const getBooks = () => API.get('/books');
