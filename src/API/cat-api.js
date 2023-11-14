import axios from 'axios';

const API_KEY =
  'live_QVLnKetS6QHAlOcy0SC4nAjNliSPtxhJCS9bVKUx2jnwDwpD1RvX7tcgG1UVxXaZ';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export const fetchBreeds = () =>
  axios.get('https://api.thecatapi.com/v1/breeds');

export const fetchCatByBreed = breedId =>
  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
