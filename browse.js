

const movieWrapper = document.querySelector('.movies')
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
let currentMovies = []; // stores the latest movie list

async function renderMovies(filter) {
    movieWrapper.classList.add('movies__loading');

    try {
        const movies = await fetch("https://www.omdbapi.com/?apikey=d051fbc2&s=Fast");
        const movieData = await movies.json();

        if (movieData.Response !== "True") {
            movieWrapper.innerHTML = "<p>No results found</p>";
            return;
        }

        // Sorting
        if(filter === 'A_TO_Z') {
            movieData.Search.sort((a, b) => a.Title.localeCompare(b.Title))
        } 
        else if(filter === 'Z_TO_A') {
            movieData.Search.sort((a, b) => b.Title.localeCompare(a.Title))
        }
        else if(filter === 'NEWEST_TO_OLDEST') {
            movieData.Search.sort((a, b) => b.Year.localeCompare(a.Year))
        }
        else if(filter === 'OLDEST_TO_NEWEST') {
            movieData.Search.sort((a, b) => a.Year.localeCompare(b.Year))
        }

        // Render
        movieWrapper.innerHTML = movieData.Search
            .slice(0,6)
            .map(movie => movieHTML(movie))
            .join("");

    } catch(err) {
        console.error(err);
        movieWrapper.innerHTML = "<p>Something went wrong</p>";
    } finally {
        movieWrapper.classList.remove('movies__loading');
    }
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


searchBtn.addEventListener('click',()=>{
    const query = searchInput.value.trim();
    if(query){
     searchAPI(query);   
    }
    else {
        console.log("No query entered")
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if(query) {
            searchAPI(query);
        }
        else {
            console.log("No query entered")
        }
    }
});

async function searchAPI(query){
    const endpoint = `https://www.omdbapi.com/?apikey=d051fbc2&s=${encodeURIComponent(query)}` // Use encodeURIComponent for safe URL query parameters
    movieWrapper.classList.add('movies__loading');
    
    try{
    const response =  await fetch(endpoint);
    const data = await response.json();
    
    movieWrapper.classList.remove('movies__loading');
    displayResults(data);
    if(filter === 'A_TO_Z') {
        movieData.Search.sort((a, b) => a.Title.localeCompare(b.Title))
    } 
    else if(filter === 'Z_TO_A') {
        movieData.Search.sort((a, b) => b.Title.localeCompare(a.Title))
    }
    else if(filter === 'NEWEST_TO_OLDEST') {
        movieData.Search.sort((a, b) => b.Year.localeCompare(a.Year))
    }
    else if(filter === 'OLDEST_TO_NEWEST') {
        movieData.Search.sort((a, b) => a.Year.localeCompare(b.Year))
    }
    } catch(err){
    console.error(err);
    movieWrapper.innerHTML = "<p>Something went wrong.</p>";}
    }
    
    
    
    function displayResults(data) {
        if (data.Response === "True"){movieWrapper.innerHTML = data.Search
        .slice(0,6)
        .map(movie => movieHTML(movie))
        .join(""); }
    else{
        movieWrapper.innerHTML = "<p> No results found</p>"
    }}
    

