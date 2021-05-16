var id1;
var id2;
var box;

async function initialpokes() {
    box = "box1"
    await runfetch("https://pokeapi.co/api/v2/pokemon/4");
    box = "box2"
    await runfetch("https://pokeapi.co/api/v2/pokemon/1");
}

function runbox1() {
    box = "box1";
    run();
}

function runbox2() {
    box = "box2";
    run();
}

function run() {
    let idbt = "inputpoke" + box;
    document.getElementById("loader").style.visibility = "visible";
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    var input = "error"
    if (document.getElementById(idbt).value != "") {
        var input = document.getElementById(idbt).value;
        var fetchpokemon = apibase + input;
        runfetch(fetchpokemon);
    } else {
        document.getElementById("loader").style.visibility = "hidden";
        alert("Campo Pokesearch vazio!");
    }

}

async function runfetch(fetchpokemon) {
    idcomp = box;
    sprite = "pokemonsprite" + box;
    pokename = "pokename" + box;
    pokeID = "pokeID" + box;
    let response = await fetch(fetchpokemon);
    if (response.ok) {
        let json = await response.json();
        id = await json.id;
        document.getElementById(sprite).src = await json.sprites.front_default;

        name = await json.name;

        document.getElementById(pokename).innerHTML = name;
        document.getElementById(pokeID).innerHTML = "#" + id;

        document.getElementById("loader").style.visibility = "hidden";
    } else {
        document.getElementById("loader").style.visibility = "hidden";
        alert("Pokemon não existe");
    }
}