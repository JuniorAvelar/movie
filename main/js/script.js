
const inputSearch = document.querySelector(".search-input")
const formSearch = document.querySelector(".form-search")
const cardControl = document.querySelector(".card-control")
const swiperWrapper = document.querySelector(".swiper-wrapper")

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
        const movieTitle = filme.title
        const movieImg = filme.poster_path
        const movieQualification = filme.vote_average
        const movieData = filme.release_date

        // div img-card
        const div = document.createElement("div")
        div.classList.add("movie-card" , 'swiper-slide')
        
        // div img
        const divImg = document.createElement("div")
        divImg.classList.add("movie-img")

        const img = document.createElement("img")
        divImg.appendChild(img)
        img.src = baseURL + movieImg
        
        // div title
        const divTitle = document.createElement("div")
        divTitle.classList.add("movie-title")
        const h3Title = document.createElement("h3")
        h3Title.innerText = movieTitle
        const spanIcon =  document.createElement("span")

        divTitle.appendChild(h3Title)

        // div movi-info
        const divInfo = document.createElement("div")
        divInfo.classList.add("movie-info")

        const spanInfo = document.createElement("span")
        spanInfo.textContent = movieData

        const infoIcon = document.createElement("span")
        infoIcon.classList.add("span-info")
        infoIcon.innerHTML = '<ion-icon class="star-icon" name="star"></ion-icon>'

        const avSpan = document.createElement("span")
        avSpan.textContent = movieQualification


        divInfo.appendChild(spanInfo)
        divInfo.appendChild(infoIcon)
        infoIcon.appendChild(avSpan)

        // criando card
        div.appendChild(divImg)
        div.appendChild(divTitle)
        div.appendChild(divInfo)

        swiperWrapper.appendChild(div)
        cardControl.appendChild(swiperWrapper)

        swiper.update();
        console.log(cardControl)
        
    });
}

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    freeMode: false,
    centerInsufficientSlides: true,
    pagination: {
      el: null,
      clickable: false,
    },
  });

fetchMoviesPopulares()
renderMovies()


// eventos

formSearch.addEventListener("submit" , (e) => {
    e.preventDefault()
    const inputValue = inputSearch.value

    fetchMoviesAndSeries(inputValue)
})  