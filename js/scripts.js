let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid Pokémon data');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    listItem.classList.add('list-group-item');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types.map((typeInfo) => typeInfo.type.name);
    } catch (e) {
      console.error(e);
    }
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    let modalBody = document.querySelector('.modal-body');
    let pokemonImage = document.querySelector('#pokemonImage');
    let pokemonHeight = document.querySelector('#pokemonHeight');

    modalTitle.innerText = pokemon.name;
    pokemonImage.setAttribute('src', pokemon.imageUrl);
    pokemonImage.setAttribute('alt', `${pokemon.name} image`);
    pokemonHeight.innerText = `Height: ${pokemon.height}`;
    
    $('#pokemonModal').modal('show');
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
