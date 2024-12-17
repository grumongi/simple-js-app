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
    loadDetails (pokemon). then (function() {
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    let image = document.createElement("img");
    image.src = pokemon.imageUrl;
    image.alt = `${pokemon.name} image`;
    image.classList.add("pokemon-image");

    button.appendChild(image);
    button.addEventListener('click', function () {
        showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
});
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        console.log('Details fetched for:', item.name);
        console.log('Sprites:', details.sprites);
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map((typeInfo) => typeInfo.type.name);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = title;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = text;

    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', img);
    pokemonImage.style.width = '100%';

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
     console.log  (pokemon.name);
     console. log ('Image URL:', pokemon.imageUrl);
     console. log ('Height:', pokemon.height);
     alert(`Name: ${pokemon.name}\nHeight: ${pokemon.height}`);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});