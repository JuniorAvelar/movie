
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



// eventos

formSearch.addEventListener("submit" , (e) => {
    e.preventDefault()
    const inputValue = inputSearch.value

    getMovieName(inputValue)
})  