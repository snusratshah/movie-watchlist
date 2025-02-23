const moviesContainer = document.getElementById("movies-container")
const searchForm = document.getElementById("search-form")
let moviesList = []
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

//Event listeners
searchForm.addEventListener("submit", searchForMovies)
moviesContainer.addEventListener("click", addToWishlist)

//functions

//This function first fetch results using search term, then fetch each movie object using imdbID 
// of each movie contained in data.Search array.
async function searchForMovies(event) {
    event.preventDefault()
    moviesList = []
    let searchInput = document.getElementById("search-input")
    const response = await fetch(`https://www.omdbapi.com/?apikey=56d65ca&s=${searchInput.value}`)
    const data = await response.json()
    if (data && Array.isArray(data.Search) && data.Search.length > 0) {
        for (let movie of data.Search) {
            const response = await fetch(`https://www.omdbapi.com/?apikey=56d65ca&i=${movie.imdbID}`)
            const movieDetails = await response.json()
            moviesList.push(movieDetails)
        }
    } 
    renderMovies(moviesList)
    searchInput.value = ""
}

//This function render movies present in movieList array on the Search for movies page.
function renderMovies(moviesList) {
    moviesContainer.innerHTML = ""
    if (moviesList.length > 0) {
        const moviesHtml = moviesList.map(movie => {
            return `
                <div class="single-movie-container">
                    <img class="poster-img" src="${movie.Poster}">
                    <div class="movie-details">
                        <div>
                            <h2 class="movie-title">${movie.Title}</h2>
                            <p class="other-details">⭐${movie.imdbRating}</p>
                        </div>
                        <div>
                            <p class="other-details">${movie.Runtime}</p>
                            <p class="other-details">${movie.Genre}</p>
                            <div> 
                                <button class="add-remove-btn" data-imdb-id="${movie.imdbID}">
                                    <img class="add-icon"  src="/images/add-icon.svg" data-imdb-id="${movie.imdbID}">
                                    Watchlist
                                </button>
                            </div>
                        </div>
                        <p class="movie-plot">${movie.Plot}</p>
                    </div>
                </div>
                ` 
         }).join(" ")
         moviesContainer.innerHTML = moviesHtml
    } else {
        moviesContainer.innerHTML = `
        <p class="empty-page-text">Unable to find what you’re looking for. Please try another search.</p>
        `
    }
}

//This function adds movie to the watchList array, and then save that array in localStorage.
function addToWishlist(event) {
    if(event.target.dataset.imdbId) {
        const clickedMovieId = event.target.dataset.imdbId
        const movieExists = watchlist.some(movie => movie.imdbID === clickedMovieId);
        if (!movieExists) {
            for (let movie of moviesList) {
                if (movie.imdbID === clickedMovieId) {
                    watchlist.push(movie)
                }
            }
        }
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
}



