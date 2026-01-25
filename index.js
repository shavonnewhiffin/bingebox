const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer')
const searchIcon=document.querySelector('.search');

searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    const query = searchInput.value;
    if(query){
     searchAPI(query);   
    }
});

async function searchAPI(query){
    const endpoint = `https://www.omdbapi.com/?apikey=d051fbc2&s=${encodeURIComponent(query)}` // Use encodeURIComponent for safe URL query parameters
    
    searchIcon.style.display = 'none';
    searchBtn.classList.add('landing__btn--loading');
    
    try{
    const response =  await fetch(endpoint);
    const data = await response.json();
    searchBtn.classList.remove('landing__btn--loading');
    searchIcon.style.display = 'inline';
    displayResults(data);
    } catch(err){
    console.error(err);
    resultsContainer.innerHTML = "<p>Something went wrong.</p>";
    searchBtn.classList.remove('landing__btn--loading');
    searchIcon.style.display = 'inline';
    }
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