import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const divEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

// off loader before init
loaderEl.style.display = 'none';

// array of cats
let catsArr = null;

function initSlimSelect() {
  const slimSelect = new SlimSelect({
    select: document.querySelector('.breed-select'),
    settings: {
      showSearch: false,
    },
  });

  return slimSelect;
}

function showSlimSelect() {
  selectEl.style.display = 'flex';
  initSlimSelect();
}

// hide select before request
selectEl.style.display = 'none';

fetchBreeds()
  .then(data => {
    catsArr = data;
    data.forEach(el => {
      const oprionEl = document.createElement('option');
      oprionEl.value = el.id;
      oprionEl.textContent = el.name;
      selectEl.append(oprionEl);
      selectEl.classList.remove('is-hidden');
    });
    loaderEl.style.display = 'none';

    //init SELECT AFTER FETCH DATA
    showSlimSelect();
  })
  .catch(err => {
    console.warn(err);
    loaderEl.style.display = 'none';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

selectEl.addEventListener('change', event => {
  divEl.innerHTML = '';
  fetchCatByBreed(event.target.value)
    .then(data => {
      loaderEl.style.display = 'none';

      const currentCatData = catsArr.find(el => el.id === event.target.value);
      divEl.innerHTML = `
                <img src="${data[0].url}" alt="cats" width="250" height="250">
                <div>
                    <p class="cat-header">${currentCatData.name}</p>
                    <p>${currentCatData.description}</p>
                    <p class="cat-temperament">Temperament - ${currentCatData.temperament}</p>
                </div>
                `;
    })
    .catch(err => {
      console.warn(err);
      divEl.innerHTML = '';
      loaderEl.style.display = 'none';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});