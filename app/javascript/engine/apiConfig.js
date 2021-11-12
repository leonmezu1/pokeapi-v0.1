import axios from 'axios';

export const apiEngine = (axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
}).defaults.headers.common['X-CSRF-TOKEN'] = csrfToken);

export function fetchPokedex(page = 0) {
  apiEngine.post('pokedex', { page });
}
