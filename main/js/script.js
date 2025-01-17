
const inputSearch = document.querySelector(".search-input")
const formSearch = document.querySelector(".form-search")
const cardControl = document.querySelector(".card-control")

const baseURL = "https://image.tmdb.org/t/p/w780"


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
        img.src = baseURL + filme.backdrop_path
        
        // div title
        const divTitle = document.createElement("div")
        divTitle.classList.add("movie-title")
        const h3Title = document.createElement("h3")
        h3Title.innerText = filme.title
        const spanIcon =  document.createElement("span")
        // spanIcon.innerHTML = `<ion-icon class="movie-card-icon" name="heart-outline"></ion-icon>`

        divTitle.appendChild(h3Title)
        // divTitle.appendChild(spanIcon)

        // div movi-info
        const divInfo = document.createElement("div")
        divInfo.classList.add("movie-info")

        const spanInfo = document.createElement("span")
        spanInfo.textContent = filme.
        release_date

        const infoIcon = document.createElement("span")
        infoIcon.classList.add("span-info")
        infoIcon.innerHTML = '<ion-icon class="star-icon" name="star"></ion-icon>'

        const avSpan = document.createElement("span")
        avSpan.textContent = filme.vote_average


        divInfo.appendChild(spanInfo)
        divInfo.appendChild(infoIcon)
        infoIcon.appendChild(avSpan)



        div.appendChild(divImg)
        div.appendChild(divTitle)
        div.appendChild(divInfo)

        cardControl.appendChild(div)

        console.log(div)
        
    });
}

fetchMoviesPopulares()
renderMovies()




// eventos

formSearch.addEventListener("submit" , (e) => {
    e.preventDefault()
    const inputValue = inputSearch.value

    fetchMoviesAndSeries(inputValue)
})  