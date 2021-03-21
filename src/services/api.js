import axios from 'axios';// necesario instalar biblioteca axios

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;