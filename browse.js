

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

