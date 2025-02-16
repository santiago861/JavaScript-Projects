const pokemonInfo = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonImage = document.getElementById('img');


const nameSpan = document.getElementById('pokemon-name');
const idSpan = document.getElementById('pokemon-id');
const weightSpan = document.getElementById('weight');
const heightSpan = document.getElementById('height');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const types = document.getElementById('types');

const stats = [hp, attack, defense, specialAttack, specialDefense, speed];

// Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id} to get 
// data for a Pokémon, where {name-or-id} is the Pokémon's name or id number.
// For example => 
    // https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu
    // https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/25

const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      alert('Pokémon not found');
    }
}; 



const showPokemonInfo = async () => {
  types.innerHTML = '';
    try {
      const inputValue = searchInput.value.toLowerCase();
      console.log(inputValue)

      const pokeData = await fetchData(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`);
      console.log(pokeData); 

      const id = pokeData['id'];
      const name = pokeData['name'];

      pokemonImage.innerHTML = `<img id='sprite' src='${pokeData['sprites']['front_default']}' alt='imagen de ${name}'>`
      nameSpan.textContent = `${name.toUpperCase()} `;
      idSpan.textContent = `#${id}`;
      weightSpan.textContent = `Weight: ${pokeData['weight']}`;
      heightSpan.textContent = `Height: ${pokeData['height']}`;

      for (let i = 0; i < stats.length; i++) {
        stats[i].textContent = pokeData['stats'][i]['base_stat']
      }
      
      for (let i = 0; i < pokeData['types'].length; i++) {
        types.innerHTML += `<div id='type' class='${pokeData['types'][i]['type']['name']}'>${pokeData['types'][i]['type']['name'].toUpperCase()}</div>`
      }

    } catch (err) {
        console.log(err);
    }
}


// Event Listeners ---------------------------------------------------------------------------------------------------------
searchButton.addEventListener('click', () => {
  showPokemonInfo();

})

searchInput.addEventListener('keydown', (key) => {
    if (key.code === 'Enter') {
        showPokemonInfo();
    }
})


// Example of data structure ---------------------------------------------------------------------------------------------------------
// {"base_experience":112,"height":4,"id":25,"name":"pikachu","order":35,
//  "sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
//            "back_female":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png",
//            "back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
//            "back_shiny_female":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png",
//            "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
//            "front_female":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png",
//            "front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
//            "front_shiny_female":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png"},
//  "stats":[{"base_stat":35,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}},
//           {"base_stat":55,"effort":0,"stat":{"name":"attack",
//                                              "url":"https://pokeapi.co/api/v2/stat/2/"}},
//           {"base_stat":40,"effort":0,"stat":{"name":"defense",
//                                              "url":"https://pokeapi.co/api/v2/stat/3/"}},
//           {"base_stat":50,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},
//           {"base_stat":50,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},
//           {"base_stat":90,"effort":2,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}}],
//  "types":[{"slot":1,"type":{"name":"electric","url":"https://pokeapi.co/api/v2/type/13/"}}],
//  "weight":60}