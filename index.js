const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer')
const searchIcon=document.querySelector('.search');
const filterBox = document.getElementById('filter__box');
let movies = [];

searchBtn.addEventListener('click',()=>{
    const query = searchInput.value.trim();
    if(query){
     searchAPI(query);   
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if(query) {
            searchAPI(query);
        }
    }
});

async function searchAPI(query){
    if(!query) return;
    const endpoint = `https://www.omdbapi.com/?apikey=d051fbc2&s=${encodeURIComponent(query)}` // Use encodeURIComponent for safe URL query parameters
    
    searchIcon.style.display = 'none';
    searchBtn.classList.add('landing__btn--loading');
    
    try{
    const response =  await fetch(endpoint);
    const data = await response.json();
    searchBtn.classList.remove('landing__btn--loading');
    searchIcon.style.display = 'inline';
    movies = data.Search || [];
    displayResults(movies);
    } catch(err){
    console.error(err);
    resultsContainer.innerHTML = "<p>Something went wrong.</p>";
    searchBtn.classList.remove('landing__btn--loading');
    searchIcon.style.display = 'inline';
    }
}


 // Sorting
 if(filter === 'A_TO_Z') {
    data.Search.sort((a, b) => a.Title.localeCompare(b.Title))
} 
else if(filter === 'Z_TO_A') {
    data.Search.sort((a, b) => b.Title.localeCompare(a.Title))
}
else if(filter === 'NEWEST_TO_OLDEST') {
    data.Search.sort((a, b) => b.Year.localeCompare(a.Year))
}
else if(filter === 'OLDEST_TO_NEWEST') {
    data.Search.sort((a, b) => a.Year.localeCompare(b.Year))
}


function displayResults(movieList) {
    if (!movieList || movieList.length === 0) {
        filterBox.classList.remove('filter__landing--visible');
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
    }

    filterBox.classList.add('filter__landing--visible');

    resultsContainer.innerHTML = movieList
        .slice(0, 6)
        .map(movieHTML)
        .join("");
}

function filterMovies(event) {
    const filter = event.target.value;

    if (filter === 'A_TO_Z') {
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    } 
    else if (filter === 'Z_TO_A') {
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    }
    else if (filter === 'NEWEST_TO_OLDEST') {
        movies.sort((a, b) => b.Year - a.Year);
    }
    else if (filter === 'OLDEST_TO_NEWEST') {
        movies.sort((a, b) => a.Year - b.Year);
    }

    displayResults(movies);
}

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