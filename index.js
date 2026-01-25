const searchForm = document.getElementById('searchForm');
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

searchBtn.classList.remove('search')
searchBtn.classList.add('landing__btn--loading');

try{
const response =  await fetch(endpoint);
const data = await response.json();
searchBtn.classList.remove('landing__btn--loading');
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