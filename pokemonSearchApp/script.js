const pokemonInfo = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonImage = document.getElementById('img');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id} to get 
// data for a Pokémon, where {name-or-id} is the Pokémon's name or id number.
// For example => 
    // https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu
    // https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/25

const fetchData = async () => {
    try {
      const res = await fetch(pokemonInfo);
      const data = await res.json();
      showPokemonInfo(data)
    } catch (err) {
      alert('Pokémon not found');
    }
  };

const showPokemonInfo = (data) => {
    const { results } = data;
    const inputValue = searchInput.value;
    const pokemonData = results[inputValue - 1];

    const id = pokemonData['id']
    const name = pokemonData['name']
    const url = pokemonData['url']
    pokemonImage.innerHTML = `<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png' alt='imagen de ${name}'>`
    console.log(pokemonData);
    console.log(id)
    console.log(name)
    console.log(url)
}

// {id: 23, name: 'ekans', url: 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/23/'}




// Event Listeners ---------------------------------------------------------------------------------------------------------
searchButton.addEventListener('click', () => {
    fetchData();
    

})

searchInput.addEventListener('keydown', (key) => {
    if (key.code === 'Enter') {
        fetchData();
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