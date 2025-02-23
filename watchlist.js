const watchlistContainer = document.getElementById("watchlist-container")
let watchlist = JSON.parse(localStorage.getItem("watchlist"))

//Event listeners
watchlistContainer.addEventListener("click", removeFromWishlist)

//functions

//This function render movies present in watchList array on My Watchlist page.
function renderWatchlist(watchlist) {
    watchlistContainer.innerHTML = `
    <p class="empty-page-text">Your watchlist is looking a little empty...</p>
    <a class="add-remove-btn" href="index.html">
        <img class="add-icon"  src="/images/add-icon.svg">
        Let’s add some movies!
    </a>
    `
    if (watchlist.length > 0) {
        watchlistContainer.innerHTML = ""
        const watchlistHtml = watchlist.map(movie => {
            return `
                <div class="single-movie-container">
                    <img class="poster-img" src="${movie.Poster}">
                    <div class="movie-details">
                        <div class="title-and-rating">
                            <h2 class="movie-title">${movie.Title}</h2>
                            <p class="other-details">⭐${movie.imdbRating}</p>
                        </div>
                        <div class="runtime-and-genre">
                            <p class="other-details">${movie.Runtime}</p>
                            <p class="other-details">${movie.Genre}</p>
                            <div> 
                                <button class="add-remove-btn" data-imdb-id="${movie.imdbID}">
                                    <img class="add-icon"  src="/images/remove-icon.svg" data-imdb-id="${movie.imdbID}">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <p class="movie-plot">${movie.Plot}</p>
                    </div>
                </div>
                ` 
         }).join(" ")
         watchlistContainer.innerHTML = watchlistHtml
    } 
}

//This function removes movie from watchList array and then save the latest array to localStorage.
function removeFromWishlist(event) {
    if (event.target.dataset.imdbId) {
        const clickedMovieId = event.target.dataset.imdbId
        for (let movie of watchlist) {
            if(clickedMovieId === movie.imdbID) {
                watchlist.splice(watchlist.indexOf(movie), 1)
            }
        }
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        renderWatchlist(watchlist)
    }
} 

//Calling render function to show movies in watchlist array
renderWatchlist(watchlist)