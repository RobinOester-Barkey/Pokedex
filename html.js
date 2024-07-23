/* Erstellung des PokeDexs */
function generateIndividuallyPokemon(name, pokemonElement, image, id) {
    let element = pokemonElement.charAt(0).toUpperCase() + pokemonElement.slice(1);
    return `
    <div onclick="showDetails(${id}); openDetailView()" class="single_pokemon ${pokemonElement}">
        <div class="pokemon_header">
            <h2>${name}</h2>
            <h2>#${id}</h2>
        </div>
        <div class= "information">
            <div class = "pokemonElement">
                <p class="element">${element}</p>
            </div>
            <div class = "pokemonImage">
                <img src="${image}" alt="Pokemon Image">
            </div>
        </div>
    </div>
    `;
};


/* Generieren der Detailansicht */
function generatePokemonDetails(detailedPokemon, id, i) {
    let typeUpperCase = detailedPokemon['types']['0']['type']['name'].charAt(0).toUpperCase() + detailedPokemon['types']['0']['type']['name'].slice(1);
    return `
    <div class="detailView_window">
        <div class="close_detailView">
            <img onclick="closeDetailView()" src="./img/exit.png">
        </div>
        <div id="pokemon_details" class="detailView">
            <div class="details_header ${detailedPokemon['types']['0']['type']['name']}">
                <div class="details_name">
                    <h3>${detailedPokemon['name']}</h3>
                    <h3>#${id}</h3>
                </div> 
                <div class="details_image">
                    <div>
                        <img onclick="showPreviousPokemon(${i - 1})" src="./img/back.png">
                    </div>
                    <div class="pokemon_image">
                        <img src="${detailedPokemon['sprites']['other']['official-artwork']['front_default']}">
                    </div>
                    <div>
                        <img onclick="showNextPokemon(${i})" src="./img/forwart.png">
                    </div>           
                </div> 
                <div class="details_type">
                    <p>${typeUpperCase}</p>
                </div>
            </div>
            <div>
                <table id="pokemonStats"></table>
            </div>
        </div>
    </div>
    `;
};