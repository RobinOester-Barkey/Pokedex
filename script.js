let loadedPokemon = [];
let amountLoadedPokemon = 30;

/* Start */
function render() {
    loadPokemon();
};

/* Ersten 30 Pokemon werden geladen und in einem Array abgelegt */
async function loadPokemon() {
    for (let i = 1; i < amountLoadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    renderPokemonDetails();
};

async function renderPokemonDetails() {
    let individuallyPokemon = document.getElementById('pokedex');
    individuallyPokemon.innerHTML = '';
    loadedPokemon.forEach((pokemon, index) => {
        individuallyPokemon.innerHTML += loadIndividuallyPokemon(pokemon, index);
    });
};

function loadIndividuallyPokemon(pokemon, index) {
    let name = pokemon.name;
    let id = pokemon.id;
    let pokemonElement = pokemon.types[0].type.name;
    let image = pokemon.sprites.other['official-artwork'].front_default;
    let generatedPokemon = generateIndividuallyPokemon(name, pokemonElement, image, id);
    return generatedPokemon;
};

async function loadMorePokemon() {
    let lastAmount = loadedPokemon.length;
    amountLoadedPokemon += 10;
    for (let i = lastAmount + 1; i <= amountLoadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    renderPokemonDetails();
};

function checkInputLength() {
    let input = document.getElementById('searchPokemon').value;
    let loadMoreButton = document.getElementById('loadMore');
    if (input.length >= 3) {
        filterPokemon(input);
        loadMoreButton.classList.add('d-none');
    } else {
        renderPokemonDetails();
        loadMoreButton.classList.remove('d-none');
    };
};

function filterPokemon(searchedPokemon) {
    let pokedex = document.getElementById('pokedex');
    let pokemons = pokedex.getElementsByClassName('single_pokemon');
    for (let i = 0; i < pokemons.length; i++) {
        let pokemonName = pokemons[i].querySelector('.pokemon_header h2:first-child').textContent.toLowerCase();
        if (pokemonName.includes(searchedPokemon)) {
            pokemons[i].style.display = 'block';
        } else {
            pokemons[i].style.display = 'none';
        }
    }
};

function openDetailView() {
    document.getElementById('detailView').classList.remove('d-none');
    document.body.classList.add('detailView_open');
};

function closeDetailView() {
    document.getElementById('detailView').classList.add('d-none');
    document.body.classList.remove('detailView_open');
};

function showDetails(i) {
    let details = document.getElementById('detailView');
    details.innerHTML = '';
    let numberOfPokemon = i - 1;
    let detailedPokemon = loadedPokemon[numberOfPokemon];
    let id = detailedPokemon['id']
    details.innerHTML = generatePokemonDetails(detailedPokemon, id, i);
    renderStats(detailedPokemon);
};

/* Erstellung einer Table mit Stats */
function renderStats(currentPokemon) {
    const statsLabels = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
    const statsValues = currentPokemon.stats.map(stat => stat.base_stat);

    const statsTable = document.createElement('table');
    statsTable.classList.add('stats-table');

    statsLabels.forEach((label, index) => {
        statsTable.innerHTML += `
            <tr>
                <td class="stats-label">${label}</td>
                <td class="stats-value">${statsValues[index]}</td>
            </tr>
        `;
    });

    const tableElement = document.getElementById('pokemonStats');
    tableElement.replaceWith(statsTable);
};

/* Vor und Zürck bei der Detailansicht */
function showNextPokemon(i) {
    if (i == loadedPokemon.length) {
        i = 1;
    } else {
        i++;
    }
    showDetails(i);
    document.getElementById('detailView').onclick = null;
};

function showPreviousPokemon(i) {
    if (i == 0) {
        i = loadedPokemon.length;
    }
    showDetails(i);
    document.getElementById('detailView').onclick = null;
};

document.getElementById('searchPokemon').addEventListener('input', checkInputLength);

