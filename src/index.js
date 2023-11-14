import { fetchBreeds, fetchCatByBreed } from './API/cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const renderSelect = ({ data }) => {
  const markup = data
    .map(item => `<option value=${item.id}>${item.name}</option>`)
    .join('');

  refs.select.insertAdjacentHTML('beforeend', markup);
  refs.loader.classList.add('hidden');
  refs.select.classList.remove('hidden');
};

fetchBreeds()
  .then(renderSelect)
  .catch(err => {
    refs.loader.classList.add('hidden');
    refs.error.classList.remove('hidden');
  });

const renderCat = ({ data }) => {
  const { breeds, url } = data[0];
  const [cat] = breeds;
  console.log(cat);

  const markup = `<img
  src="${url}"
  alt="${cat.name}"
  width="400"
/><div><h2 class="title">${cat.name}</h2><p class="description">${cat.description}</p><h3>Temperament</h3><p class="temperament">${cat.temperament}</p></div>`;

  refs.loader.classList.add('hidden');

  refs.catInfo.insertAdjacentHTML('beforeend', markup);
};

const fetchCatById = event => {
  const catId = event.currentTarget.value;

  refs.catInfo.innerHTML = '';

  refs.loader.classList.remove('hidden');

  fetchCatByBreed(catId)
    .then(renderCat)
    .catch(err => {
      refs.loader.classList.add('hidden');
      refs.error.classList.remove('hidden');
    });
};

refs.select.addEventListener('change', fetchCatById);
