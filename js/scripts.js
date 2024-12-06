let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.5, type: ['grass', 'poison'] },
        { name: 'Squirtle', height: 0.5, type: ['water'] },
        { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon');
        }
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


//let pokemons = pokemonRepository.getAll();

pokemons.forEach(pokemon => {
    document.write(`<p>${pokemon.name} | height: ${pokemon.height}</p>`);

    if (pokemon.height >= 1) {
        document.write("Wow, that's big!");
    }
});
