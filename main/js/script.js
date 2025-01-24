
const inputSearch = document.querySelector(".search-input")
const formSearch = document.querySelector(".form-search")
const cardControl = document.querySelector(".card-control")
const cardControlSeries = document.querySelector(".card-control-series")
const swiperWrapper = document.querySelector(".swiper-wrapper")
const swiperWrapperSeries = document.querySelector(".swiper-wrapper-series")
const modal = document.querySelector(".modal-seach")
const modalList = document.querySelector(".list-movies-modal")


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
        const [filme , series] = await axios.all([
            tmdbApi.get('search/movie' , { params: {query: MovieName }}),
            tmdbApi.get('search/tv' , {params: {query: MovieName }})     
        ])

        return {
            filmes: filme.data.results,
            series: series.data.results
        }
        // console.log("filmes:" , filme.data.results) 
        // console.log("series:" , serie.data.results) 

    } catch (error) {
        console.log("filme não encontrado" + error)
    }
}

// busca por filmes populares 
const fetchMoviesPopulares = async () => {
    try{
        // GET /genre/movie/list
        const response = await tmdbApi.get('/movie/popular')
        // console.log(response.data.results)
        return response.data.results

    } catch (erro) {
        console.log("nenhum filme popular encontrado" , erro)
    }

}

fetchMoviesPopulares()

const fetchMoviesGenre = async () => {
    try{
        // GET /genre/movie/list
        const response = await tmdbApi.get('/genre/movie/list')
        return response.data.genres

    } catch (erro) {
        console.log("" , erro)
    }
}


// busca por séries populares 
const fetchSeriesPopulare = async () => {
    try {  
        const response =  await tmdbApi.get('/tv/popular')
        // console.log(response.data.results)
        return response.data.results
    } catch(erro) {
        console.log("nenhum série popular encontrado" , erro)
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
        div.setAttribute("data-id" , filme.genre_ids)
        
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

        const spandata = document.createElement("span")
        spandata.textContent = movieData.split("-")[0]

        const infoIcon = document.createElement("span")
        infoIcon.classList.add("span-info")
        infoIcon.innerHTML = '<ion-icon class="star-icon" name="star"></ion-icon>'

        const avSpan = document.createElement("span")
        avSpan.textContent = movieQualification.toFixed(1)


        divInfo.appendChild(spandata)
        divInfo.appendChild(infoIcon)
        infoIcon.appendChild(avSpan)

        // criando card
        div.appendChild(divImg)
        div.appendChild(divTitle)
        div.appendChild(divInfo)

        swiperWrapper.appendChild(div)
        cardControl.appendChild(swiperWrapper)
 
    });
    swiper.update();
}

const renderSeries = async () => {
    const data = await fetchSeriesPopulare();

    data.forEach(serie => {
        const div = document.createElement("div");
        div.classList.add("movie-card", "swiper-slide");
        div.setAttribute("data-id", serie.genre_ids)

        const divImg = document.createElement("div");
        divImg.classList.add("movie-img");
        const img = document.createElement("img");
        img.src = baseURL + serie.poster_path;
        divImg.appendChild(img);

        const divTitle = document.createElement("div");
        divTitle.classList.add("movie-title");
        const h3 = document.createElement("h3");
        h3.textContent = serie.name;
        divTitle.appendChild(h3);

        const divInfo = document.createElement("div");
        divInfo.classList.add("movie-info");
        const spanDate = document.createElement("span");
        spanDate.textContent = serie.first_air_date.split("-")[0];
        const spanInfo = document.createElement("span");
        spanInfo.classList.add("span-info");
        spanInfo.innerHTML = `<ion-icon class="star-icon" name="star"></ion-icon>`;
        const spanVote = document.createElement("span");
        spanVote.textContent = serie.vote_average.toFixed(1);

        spanInfo.appendChild(spanVote);
        divInfo.appendChild(spanDate);
        divInfo.appendChild(spanInfo);

        div.appendChild(divImg);
        div.appendChild(divTitle);
        div.appendChild(divInfo);

        swiperWrapperSeries.appendChild(div);
    });

    swiperSeries.update();
};

const renderModal = async (nameTitle) => {
    const data = await fetchMoviesAndSeries(nameTitle)
    const arrMoivesAndSeire = []

      data.filmes.forEach((movie) => {
        arrMoivesAndSeire.push({title:movie.title , urlImg:baseURL+movie.poster_path})
      })
      data.series.forEach((serie) => {
        arrMoivesAndSeire.push({title:serie.name , urlImg:baseURL+serie.poster_path})
      })
    
    // Prioriza itens que correspondem exatamente ao título pesquisado
    const filterArr =  arrMoivesAndSeire.sort((a , b) => {
        if(a.title.toLowerCase() === nameTitle.toLowerCase()){ return -1}
        if(b.title.toLowerCase() === nameTitle.toLowerCase()){ return 1}
        return 0
      })
      
    filterArr.forEach((item) => {
        const li = document.createElement("li"); 
        li.classList.add("modal-content")   

        li.innerHTML = `
            <div class="img-modal">
                <img src="${item.urlImg}" alt="Capa do ${item.type}">
            </div>
            <h4>${item.title}</h4>
        `;
        modalList.appendChild(li);  
    })

}

const filter = async ( ) => {
    const data = await fetchMoviesPopulares()
    data.forEach((item) => {
        if (item.genre_ids.includes(16)) {
            console.log(item.title)
        }
    })
}

// const filterEl = ( ) => {
//     setTimeout(() => {
//         const moviesEl = document.querySelectorAll(".movie-card")
//     console.log(moviesEl)
//     moviesEl.forEach((movie) =>{
//         if(!movie.getAttribute("data-id").includes(16)){
//             movie.style.display = "none"

//         }

//         console.log(movie.getAttribute("data-id"))
//     }) 

//     swiper.update();

//     } ,200)

//     // swiper.update();
    
// }
// filterEl()

const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto", // Número de slides visíveis
    spaceBetween: 18,  // Espaçamento entre os slides
    freeMode: true,   // movimento livre
    centerInsufficientSlides: true,
    pagination: {
      el: null,
      clickable: false,
    },
  });

  const swiperSeries = new Swiper(".mySwiper-series", {
    slidesPerView: "auto", // Número de slides visíveis
    spaceBetween: 18,  // Espaçamento entre os slides
    freeMode: true,   // movimento livre
    centerInsufficientSlides: true,
    pagination: {
      el: null,
      clickable: false,
    },
  });

renderMovies()
renderSeries()



// eventos

formSearch.addEventListener("submit" , (e) => {
    e.preventDefault()
    const inputValue = inputSearch.value
    if(inputValue) {
    console.log(inputValue)
    document.querySelector(".list-movies-modal").innerHTML = ""
     renderModal(inputValue)
    }
    else {
        return
    }
})  

inputSearch.addEventListener("keyup" ,() => {

    const inputValue = inputSearch.value

    if(inputSearch.value.length > 1 ) {
        document.querySelector(".modal-seach").classList.remove("hidden")
        document.querySelector(".list-movies-modal").innerHTML = ""
        renderModal(inputValue)
    }

    if(inputSearch.value.length == 0) {
        document.querySelector(".modal-seach").classList.add("hidden")
        document.querySelector(".list-movies-modal").innerHTML = ""
    }
})

inputSearch.addEventListener("blur" ,() => {
    if(!inputSearch.value) {
        document.querySelector(".modal-seach").classList.add("hidden")
        document.querySelector(".list-movies-modal").innerHTML = ""
    }
})

document.addEventListener("click" , (e) => {
    const mdc = document.querySelector(".modal-content")
    console.log(modal.contains(mdc))
    console.log(e.target)
    
    if(modal.contains(e.target)) {
      return
    }
    document.querySelector(".modal-seach").classList.add("hidden")
    document.querySelector(".list-movies-modal").innerHTML = ""
})
