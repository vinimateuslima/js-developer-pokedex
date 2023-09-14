let info = document.querySelector(".info");
let nome = document.getElementById("nome");
let numero = document.getElementById("numero");
let tipos = document.getElementById("tipos");
let imagem = document.getElementById("imagem");
let habilidades = document.getElementById("habilidades");
let experienciaBase = document.getElementById("experienciaBase");
let altura = document.getElementById("altura");

function separarDadosDoPokemon(pokemon) {
  const pokemonDados = new Pokemon();

  pokemonDados.number = pokemon.id;
  pokemonDados.name = pokemon.forms[0].name;

  const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemonDados.types = types;
  pokemonDados.type = type;

  pokemonDados.photo = pokemon.sprites.other.dream_world.front_default;

  const abilities = pokemon.abilities.map(
    (habilidade) => habilidade.ability.name
  );

  pokemonDados.abilities = abilities;

  pokemonDados.base_experience = pokemon.base_experience;

  pokemonDados.heigth = pokemon.height;

  return pokemonDados;
}
  //Recuperando parametro passado na URL com o id do pokemon
  const urlParams = new URLSearchParams(window.location.search);

  const idPokemon = urlParams.get("idPokemon");

const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

fetch(url)
  .then((response) => response.json())
  .then(separarDadosDoPokemon)
  .then((pokemonInfo) => {
    info.classList.add("info", pokemonInfo.type);

    nome.innerText = pokemonInfo.name;
    numero.innerText = pokemonInfo.number;

    for (let i = 0; i < pokemonInfo.types.length; i++) {
      let tipo = document.createElement("li");
      tipo.innerText = pokemonInfo.types[i];
      tipo.classList.add("tipo", pokemonInfo.type);
      tipos.appendChild(tipo);
    }

    imagem.src = pokemonInfo.photo;

    for (let i = 0; i < pokemonInfo.abilities.length; i++) {
      let habilidade = document.createElement("li");
      habilidade.innerText = pokemonInfo.abilities[i];
      habilidade.classList.add("habilidade");
      habilidades.appendChild(habilidade);
    }

    experienciaBase.innerText = pokemonInfo.base_experience;

    altura.innerText = pokemonInfo.heigth;
  });
