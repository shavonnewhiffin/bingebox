

const movieWrapper = document.querySelector('.movies')

async function renderMovies(filter) {
    const movies = await fetch ("https://www.omdbapi.com/?apikey=d051fbc2&s=Fast");
    movieWrapper.classList.add('movies__loading');
    const movieData = await movies.json();
movieWrapper.classList.remove('movies__loading');

    if(filter === 'A_TO_Z') {
        movieData.Search.sort((a, b) => a.Title.localeCompare(b.Title))
    } 
    else if(filter === 'Z_TO_A') {
        movieData.Search.sort((a, b) => b.Title.localeCompare(a.Title))
    }
    else if (filter === 'NEWEST_TO_OLDEST') {
    movieData.Search.sort((a,b) => b.Year.localeCompare(a.Year))
    }
    else if (filter === 'OLDEST_TO_NEWEST') {
    movieData.Search.sort((a,b) => a.Year.localeCompare(b.Year))
    }




movieWrapper.innerHTML = movieData.Search
.slice(0,6)
.map(movie => movieHTML(movie))
.join("");

}

renderMovies();

function movieHTML(movie){
    return`<div class="movie">
<figure class="movie__img--wrapper">
    <img src="${movie.Poster}" alt="" class="movie__img">
</figure>
<div class="movie__title">
 <span class = "movie__details"> ${movie.Title} </span>
</div>
<div class="movie__year">
   <span class="">${movie.Year}</span> 
</div>
</div>`
}

function filterMovies(event) {
renderMovies(event.target.value);
}

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer')

searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    const query = searchInput.value;
    if(query){
     searchAPI(query);   
    }
});

async function searchAPI(query){
    const endpoint = `https://www.omdbapi.com/?apikey=d051fbc2&s=${encodeURIComponent(query)}` // Use encodeURIComponent for safe URL query parameters
    movieWrapper.classList.add('movies__loading');
    
    try{
    const response =  await fetch(endpoint);
    const data = await response.json();
    searchBtn.classList.remove('landing__btn--loading');
    movieWrapper.classList.remove('movies__loading');
    displayResults(data);
    } catch(err){
    console.error(err);
    resultsContainer.innerHTML = "<p>Something went wrong.</p>";}
    // } finally {
    //     searchBtn.classList.remove('landing__btn--loading');
    // }
    }
    
    
    
    function displayResults(data) {
        resultsContainer.innerHTML = data.Search
        .slice(0,6)
        .map(movie => movieHTML(movie))
        .join(""); }
    
    searchAPI();
    
