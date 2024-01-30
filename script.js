const pokeContainer = document.querySelector("#pokeContainer");

const pokemonCount = 151
const colors = {
    normal: 'rgba(168, 167, 122, 0.7)',
    fire: 'rgba(238, 129, 48, 0.7)',
    water: 'rgba(99, 144, 240, 0.7)',
    electric: 'rgba(247, 208, 44, 0.7)',
    grass: 'rgba(122, 199, 76, 0.7)',
    ice: 'rgba(150, 217, 214, 0.7)',
    fighting: 'rgba(194, 46, 40, 0.7)',
    poison: 'rgba(163, 62, 161, 0.7)',
    ground: 'rgba(226, 191, 101, 0.7)',
    flying: 'rgba(169, 143, 243, 0.7)',
    psychic: 'rgba(249, 85, 135, 0.7)',
    bug: 'rgba(166, 185, 26, 0.7)',
    rock: 'rgba(182, 161, 54, 0.7)',
    ghost: 'rgba(115, 87, 151, 0.7)',
    dragon: 'rgba(111, 53, 252, 0.7)',
    fairy: 'rgba(214, 133, 173, 0.7)'
}
const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const firstType = poke.types[0].type.name;
    const color = colors[firstType]

    card.style.backgroundColor = color

    let typesHTML = '';

    pokeTypes.forEach((type, index) => {
        const color = colors[type];
        typesHTML += `<span class="type${index + 1}" style="background-color: ${color}">${type}</span>`;

        if (index < pokeTypes.length - 1) {
            typesHTML += ' / ';
        }
    });

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div> 

    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${typesHTML}</span></small>
    </div>`;

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
}


fetchPokemons()
