const API_KEY =
    'live_97sW46q4IKa50l5Xxxx0Wb1eN7sSjz9AV7OssGjHGgpAAFwwb6o66mTtSuJ0culx';
const API_URL = 'https://api.thecatapi.com/v1/';
const loaderEl = document.querySelector('.loader');

export const fetchBreeds = async () => {
    loaderEl.style.display = 'block';
    const res = await fetch(`${API_URL}breeds?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new error(res.status);
    }
    return await res.json();
};

export const fetchCatByBreed = async breedId => {
    loaderEl.style.display = 'block';
    const res = await fetch(`${API_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
    );
    if (!res.ok) {
        throw new error(res.status);
    }
    return await res.json();
};
