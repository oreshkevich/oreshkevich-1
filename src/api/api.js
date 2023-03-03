import axios from 'axios';

const API = axios.create({
  baseURL: 'https://strapi.cleverland.by/api',
});

API.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log(request);

  return request;
});

// export const signup = (formData) => API.post('/auth/local/register', formData);
export const login = (formData) => API.post('/auth/local', formData);

// export const signup = (newNote) => axios.post('https://strapi.cleverland.by/api/auth/local/register', newNote);
export const getCategories = () => API.get('/categories');
export const getBooks = () => API.get('/books');

// const response = getCategories();
// const respons = getBooks();

// console.log(response.data);
// console.log(respons.data);
