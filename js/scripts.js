let pokemonRepository = (function () {  
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.5, type: ['grass', 'poison']},
        {name: 'Squirtle', height: 0.5, type: ['water']},
        {name: 'Ivysaur', height: 1, type: ['grass', 'poison']}
    ];

function getAll() {
        return pokemonList;
    }

function add(pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add
};
})();

let pokemons = pokemonRepository.getAll();

pokemons.forEach((pokemon) => {
    document.write(`<p> + pokemon.name + '| height:' + pokemon.height + </p>`);

    if (pokemon.height >= 0.5) {
        document.write(<p>'Wow, that's Big!'</p>);
    }
});

