let page = 1;
let maxCards = 6;
const btnShowMore = document.getElementById('show-more');
const spanCharacters = document.getElementById('characters');
const spanLocations = document.getElementById('locations');
const spanEpisodes = document.getElementById('episodes');
const searchForm = document.getElementById('search-form');


document.addEventListener('DOMContentLoaded', () => {
    listCards();
    showTotalCharacters();
    showTotalLocations();
    showTotalEpisodes();
})

async function listCards() {


    // loading
    const response = await getCharacters(page)
    //loading

    //criarPaginacao
    showCards(response);
    createPagination(response.data.info)
}

btnShowMore.addEventListener('click', async () => {
    console.log(btnShowMore.textContent.trim())
    if(btnShowMore.textContent.trim() === "Ver mais"){
        maxCards = 20
        await listCards();
        btnShowMore.textContent = "Ver menos"
        return
    }

    if (btnShowMore.textContent.trim() === "Ver menos"){
        maxCards = 6
        await listCards();
        btnShowMore.textContent = "Ver mais"
        return
    }
    
})

async function showCards(response, location){
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = '';

    for (let i = 0; i < maxCards; i++){
        const divCol = document.createElement('div')
        divCol.classList.add('col-12', 'col-md-6', 'col-lg-4')
        let characterID = response.data.results[i].id;
        let characterImage = response.data.results[i].image;
        let characterName = response.data.results[i].name;
        let characterStatus = response.data.results[i].status;
        let lastLocation = response.data.results[i].location.name;
        let species = response.data.results[i].species;
        let episodeArrayLength = response.data.results[i].episode.length;
        let episode = (response.data.results[i].episode[episodeArrayLength - 1]).toString()
        let lastEpisode = await getEpisodes(episode)

        if (characterStatus === "Alive"){
            divCol.innerHTML = `
                    <div id="${characterID}" class="card bg-transparent border-success w-100 h-75 shake-horizontal">
                        <img id="character-image" src="${characterImage}" class="card-img-top h-50" alt="avatar">
                        <div class="card-body text-white" >
                            <h5 class="card-title">${characterName}</h5>
                            <p class="card-text">
                                <span class="text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/>
                                    </svg>
                                </span>Vivo - ${species}.</p>
                            <p class="text-secondary fw-bold"> Última localização conhecida:</p>
                            <p>${lastLocation}</p>
                            <p class="text-secondary fw-bold">Visto a última vez em:</p>
                            <p>${lastEpisode}</p>
                        </div>
                        <input type="hidden" value="${characterID}">
                    </div>

            `     
        } else if (characterStatus === "Dead") {
            divCol.innerHTML = `
            <div id="${characterID}" class="card bg-transparent border-success h-75 shake-horizontal">
                <img id="character-image" src="${characterImage}" class="card-img-top h-50" alt="avatar">
                <div class="card-body text-white">
                    <h5 class="card-title">${characterName}</h5>
                    <p class="card-text">
                        <span class="text-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/>
                            </svg>
                        </span>Morto - ${species}.</p>
                    <p class="text-secondary fw-bold"> Última localização conhecida:</p>
                    <p>${lastLocation}</p>
                    <p class="text-secondary fw-bold">Visto a última vez em:</p>
                    <p>${lastEpisode}</p>
                </div>
                <input type="hidden" value="${characterID}">
            </div>
        `     
        } else {
            divCol.innerHTML = `
            <div id="${characterID}" class="card bg-transparent border-success h-75 shake-horizontal">
                <img id="character-image" src="${characterImage}" class="card-img-top h-50" alt="avatar">
                <div class="card-body text-white">
                    <h5 class="card-title">${characterName}</h5>
                    <p class="card-text">
                        <span class="text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/>
                            </svg>
                        </span>Desconhecido - ${species}.</p>
                    <p class="text-secondary fw-bold"> Última localização conhecida:</p>
                    <p>${lastLocation}</p>
                    <p class="text-secondary fw-bold">Visto a última vez em:</p>
                    <p>${lastEpisode}</p>
                </div>
                <input id="id-value" type="hidden" value="${characterID}">
            </div>
        `     
        }
       
        charactersList.appendChild(divCol)

        let cardDetails = document.getElementById(`${characterID}`);
        cardDetails.addEventListener('click', () => {
            window.location.href = '/details.html'
            localStorage.setItem('id', `${characterID}`)
        })
    }
}
           

function createPagination() {

    const containerPagination = document.getElementById('container-pagination');

    containerPagination.innerHTML = `
        <li class="page-item">
            <a class="page-link text-success bg-white border-black" id="prev-link">Voltar</a>
        </li> 
    `

    containerPagination.innerHTML += `
        <li class="page-item">
            <a class="page-link text-success bg-white border-black" id="next-link">Próximo</a>
        </li>
    `
    
    const links = document.querySelectorAll('.page-link');
    links.forEach((link) => {
        link.addEventListener('click', async () => {
            switch (link.id) {
                case "prev-link":
                    page--;
                    break;
                case "next-link":
                    page++;
                    break;
                default:
                    page = Number(link.innerText);
                    break;
            }

            await listCards()
        })
    })
}

async function showTotalCharacters () {
    const response = await getTotalCharacters();
    spanCharacters.textContent = response.data.info.count
    spanCharacters.classList.add('text-white')
}

async function showTotalLocations () {
    const response = await getTotalLocations();
    spanLocations.textContent = response.data.info.count;
    spanLocations.classList.add('text-white');
}

async function showTotalEpisodes () {
    const response = await getTotalEpisodes();
    spanEpisodes.textContent = response.data.info.count;
    spanEpisodes.classList.add('text-white');
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const searchInput = document.getElementById('search-input').value;

    const response = await getTotalCharacters();

    for (let i = 0; i < response.data.results.length; i++) {
        if (searchInput === response.data.results[i].name){
            const idCharacter = response.data.results[i].id;
            showCharacters(idCharacter)
        }
    }
})