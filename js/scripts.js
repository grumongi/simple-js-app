let pokemon = [
    {name: 'Balbusaur', height: '0.5', type: ['grass', 'poison']},
    {name: 'Squirtle', height: '0.5', type: ['water', 'fire']},
    {name: 'Ivysaur', height: '1', type: ['flying']}
];

for (let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i];
    console.log('name:', currentPokemon.name);
    console.log('height:', currentPokemon.height);
    document.write('<p>' + currentPokemon.name + ' | height: ' + currentPokemon.height + '</p>');
    if (currentPokemon.height >= 1) {
        document.write('Wow that is Big!');
    }
}
