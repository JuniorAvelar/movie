
const inputSearch = document.querySelector(".search-input")
const formSearch = document.querySelector(".form-search")


// função 

// Configuração da URL base e API Key
const tmdbApi = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params: {
        api_key: "4a4dd254e538a9344ba1d8860ee5747f",
        language: "pt-BR"
    }
}
)
 
// function que busca o filme e a série 
const fetchMoviesAndSeries = async (MovieName) => {
    try {
        const [filme , serie] = await axios.all([
            tmdbApi.get('search/movie' , { params: {query: MovieName }}),
            tmdbApi.get('search/tv' , {params: {query: MovieName }})
        ])

        console.log("filmes: " , filme.data.results)
        console.log("series:" , serie.data.results)

    } catch (error) {
        console.log("filme não encontrado" + error)
    }
}

// busca por filmes populares 
const fetchMoviesPopulares = async () => {
    try{
        const response = await tmdbApi.get('/movie/popular')
        console.log("populares" , response.data.results)
        return response.data.results
    } catch (error) {

        console.log("nenhum filme popular encontrado")
    }

}

const renderMovies = async () => {
    const data = await fetchMoviesPopulares()

    data.forEach(filme => {
        console.log(filme.title)
        console.log(filme.backdrop_path)
        console.log(filme.vote_average)
        console.log(filme.poster_path)
        
        
        // div img-card
        const div = document.createElement("div")
        div.classList.add("movie-card")
        
        // div img
        const divImg = document.createElement("div")
        divImg.classList.add("movie-img")

        const img = document.createElement("img")
        divImg.appendChild(img)
        
        // div title
        const divTitle = document.createElement("div")
        const h3Title = document.createElement("h2")
        const icon = `<span><ion-icon class="star-icon" name="star"></ion-icon> 4.5</span>`

        // div movi-info
        const divInfo = document.createElement("div")
        divInfo.classList.add("movie-info")
        const spanInfo = document.createElement("span")
        const infoIcon = `span><ion-icon class="star-icon" name="star"></ion-icon> 4.5</span>`
        divInfo.appendChild(spanInfo)
        divInfo.innerHTML = infoIcon
        console.log(divInfo)
        
    });
}

fetchMoviesPopulares()
renderMovies()




// eventos

formSearch.addEventListener("submit" , (e) => {
    e.preventDefault()
    const inputValue = inputSearch.value

    getMovieName(inputValue)
})  