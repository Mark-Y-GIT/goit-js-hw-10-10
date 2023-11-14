import { fetchBreeds, fetchCatByBreed } from './API/cat-api';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-center',
});

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const fetchCatById = data => {
  const { value } = data[0];
  console.log(value);

  refs.catInfo.innerHTML = '';

  refs.loader.classList.remove('hidden');

  fetchCatByBreed(value)
    .then(renderCat)
    .catch(err => {
      refs.loader.classList.add('hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
};

const renderSelect = ({ data }) => {
  console.log(data);
  const markup = data
    .map(item => `<option value=${item.id}>${item.name}</option>`)
    .join('');

  refs.select.insertAdjacentHTML('beforeend', markup);

  new SlimSelect({
    select: refs.select,
    settings: {
      placeholderText: 'Select breed',
    },
    events: {
      afterChange: fetchCatById,
    },
  });

  refs.loader.classList.add('hidden');
  refs.select.classList.remove('hidden');
};

fetchBreeds()
  .then(renderSelect)
  .catch(err => {
    refs.loader.classList.add('hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
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
