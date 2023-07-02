const API_KEY =
  'live_97sW46q4IKa50l5Xxxx0Wb1eN7sSjz9AV7OssGjHGgpAAFwwb6o66mTtSuJ0culx';
const API_URL = 'https://api.thecatapi.com/v1/';
const loaderEl = document.querySelector('.loader');

export const fetchBreeds = () => {
  loaderEl.style.display = 'block';
  return fetch(`${API_URL}breeds?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
};

export const fetchCatByBreed = breedId => {
  loaderEl.style.display = 'block';
  return fetch(
    `${API_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
};