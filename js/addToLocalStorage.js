const API_KEY = 'api_key=19b9b4f97f8432efbb5601f05c8bb5a9';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovie(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);
    });
}

getMovie(API_URL);

function showMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const { title, genre_ids, poster_path, release_date } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}" class="movie-img">
          <div class="movie-info">
            <h3>${title}</h3>
            <p class="info">${genre_ids} | ${release_date}</p>
          </div>`;
    main.appendChild(movieEl);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovie(searchURL + '&querry=' + searchTerm);
  } else {
    getMovie(API_URL);
  }
});

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODA2NmU2YjY3Y2NiMzY2MWIzNmYzMzdiZTBjOGM0YSIsInN1YiI6IjY2NjQyZTM4NGUzOTM4NDU2YWU5YTY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-iIaxEjAHDiON4DR6yEMpaLYopf3brFQ3CyMO_fuHOo',
//   },
// };

// fetch('https://api.themoviedb.org/3/authentication', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
