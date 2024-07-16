const idCharacter = localStorage.getItem('id');
const btnPrev = document.getElementById('prev-page');


window.addEventListener('DOMContentLoaded', () => {
    showCharacters();
})

btnPrev.addEventListener('click', () => {
    window.location.href = 'index.html'
})

async function showCharacters (id) {
    const response = await getDetails(idCharacter);

    const rowDetails = document.getElementById('characters-detail');

    const divCol = document.createElement('div')
        divCol.classList.add('col-8', 'col-md-4', 'col-lg-4', 'offset-md-4', 'offset-2', 'g-3')
        let characterImage = response.data.image;
        let characterName = response.data.name;
        let characterStatus = response.data.status;
        let lastLocation = response.data.location.name;
        let species = response.data.species;

        if (characterStatus === "Alive"){
            divCol.innerHTML = `
                    <div class="card bg-transparent border-success w-100 h-75 shake-horizontal">
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
                        </div>
                    </div>

            `     
        } else if (characterStatus === "Dead") {
            divCol.innerHTML = `
            <div class="card bg-transparent border-success h-75 shake-horizontal">
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
                </div>
            </div>
        `     
        } else {
            divCol.innerHTML = `
            <div class="card bg-transparent border-success h-75 shake-horizontal">
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

                </div>
            </div>
        `     
    }
    rowDetails.appendChild(divCol);


}
