import axios from 'axios';

export const apiEngine = (axios.create({
  baseURL: 'http://localhost:3000/',
}).defaults.headers.common['X-CSRF-TOKEN'] = csrfToken);

export function fetchPokedex(page = 0) {
  apiEngine.post('pokedex', { page });
}
