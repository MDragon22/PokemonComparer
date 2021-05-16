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
        input = input.toLowerCase();
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
        hp = await json.stats[0].base_stat;
        atk = await json.stats[1].base_stat;
        def = await json.stats[2].base_stat;
        spatk = await json.stats[3].base_stat;
        spdef = await json.stats[4].base_stat;
        speed = await json.stats[5].base_stat;
        statsmaker(hp, atk, def, spatk, spdef, speed);
        textstats(hp, atk, def, spatk, spdef, speed);
        document.getElementById(pokename).innerHTML = name;
        document.getElementById(pokeID).innerHTML = "#" + id;

        document.getElementById("loader").style.visibility = "hidden";
    } else {
        document.getElementById("loader").style.visibility = "hidden";
        alert("Pokemon não existe");
    }
}

function statsmaker(hp, atk, def, spatk, spdef, speed) {

    document.getElementById("barra0" + box).style.width = hp / 3 + "%";

    document.getElementById("barra1" + box).style.width = atk / 3 + "%";

    document.getElementById("barra2" + box).style.width = def / 3 + "%";

    document.getElementById("barra3" + box).style.width = spatk / 3 + "%";

    document.getElementById("barra4" + box).style.width = spdef / 3 + "%";

    document.getElementById("barra5" + box).style.width = speed / 3 + "%";
}

function textstats(hp, atk, def, spatk, spdef, speed) {


    if (String(hp).length == 2) {
        document.getElementById("linha0" + box).innerHTML = "Hp................" + hp;
    } else {
        document.getElementById("linha0" + box).innerHTML = "Hp..............." + hp;
    }

    if (String(atk).length == 2) {
        document.getElementById("linha1" + box).innerHTML = "Attack............" + atk;
    } else {
        document.getElementById("linha1" + box).innerHTML = "Attack..........." + atk;
    }

    if (String(def).length == 2) {
        document.getElementById("linha2" + box).innerHTML = "Defense..........." + def;
    } else {
        document.getElementById("linha2" + box).innerHTML = "Defense.........." + def;
    }

    if (String(spatk).length == 2) {
        document.getElementById("linha3" + box).innerHTML = "Special-Attack...." + spatk;
    } else {
        document.getElementById("linha3" + box).innerHTML = "Special-Attack..." + spatk;
    }

    if (String(spdef).length == 2) {
        document.getElementById("linha4" + box).innerHTML = "Special-Defense..." + spdef;
    } else {
        document.getElementById("linha4" + box).innerHTML = "Special-Defense.." + spdef;
    }

    if (String(speed).length == 2) {
        document.getElementById("linha5" + box).innerHTML = "Speed............." + speed;
    } else {
        document.getElementById("linha5" + box).innerHTML = "Speed............" + speed;
    }
}