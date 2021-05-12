function run() {
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    var input = document.getElementById("inputpoke").value;
    var fetchpokemon = apibase + input;
    runfetch(fetchpokemon);

}

function runfetch(fetchpokemon) {
    fetch(fetchpokemon)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            document.getElementById("demo").innerHTML = result.stats[0].base_stat;
            document.getElementById("pokemonsprite").src = result.sprites.front_default;
        })
    sprites.front_default
}