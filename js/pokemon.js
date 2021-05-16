var front = true;
var shiny = false;
var id = null;
var move = 0;
var movetotal;
var jsonglobal;

async function initialpoke() {
    await runfetch("https://pokeapi.co/api/v2/pokemon/1");
}

function run() {
    document.getElementById("loader").style.visibility = "visible";
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    var input = "error"
    if (document.getElementById("inputpoke").value != "") {
        var input = document.getElementById("inputpoke").value;
        var fetchpokemon = apibase + input;
        runfetch(fetchpokemon);
    } else {
        document.getElementById("loader").style.visibility = "hidden";
        alert("Campo Pokesearch vazio!");
    }

}

async function runfetch(fetchpokemon) {
    move = 0;
    let response = await fetch(fetchpokemon);
    if (response.ok) {
        let json = await response.json();
        jsonglobal = json;
        id = await json.id;
        imagebuilder(id);
        hp = await json.stats[0].base_stat;
        atk = await json.stats[1].base_stat;
        def = await json.stats[2].base_stat;
        spatk = await json.stats[3].base_stat;
        spdef = await json.stats[4].base_stat;
        speed = await json.stats[5].base_stat;
        movetotal = await json.moves.length
        movesbuild();
        statsmaker(hp, atk, def, spatk, spdef, speed);
        textstats(hp, atk, def, spatk, spdef, speed);
        name = await json.name;
        weight = await json.weight;
        height = await json.height;
        speciesfetch(id);
        document.getElementById("infoweight").innerHTML = "Weight:" + weight / 10 + "kg";
        document.getElementById("infoheight").innerHTML = "Height:" + height / 10 + "m";

        document.getElementById("pokename").innerHTML = name;
        document.getElementById("pokeID").innerHTML = "#" + id;
        type = await json.types[0].type.name;
        document.getElementById("type1").innerHTML = type;
        document.getElementById("type1").setAttribute("name", type);
        if (await json.types.length == 1) {
            document.getElementById("type2").innerHTML = "";
            document.getElementById("type2").style.background = "darkgray";
        } else {
            document.getElementById("type2").style.background = "";

            var type = await json.types[1].type.name;
            document.getElementById("type2").innerHTML = type;
            document.getElementById("type2").setAttribute("name", type);
        }
        document.getElementById("loader").style.visibility = "hidden";
    } else {
        document.getElementById("loader").style.visibility = "hidden";
        alert("Pokemon não existe");
    }
}

async function imagebuilder(id) {
    finish = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    if (front == true) {
        finish = finish + "";
    } else {
        finish = finish + "back/";
    }
    if (shiny == false) {
        finish = finish + "";
    } else {
        finish = finish + "shiny/";
    }
    finish = finish + id + ".png";
    //let response = await fetch(api);
    //let json = await response.json();
    document.getElementById("pokemonsprite").src = await finish;

}

async function movesbuild() {

    if (movetotal == 0) {
        movename = "XXXX";
        movestat1 = "Accuracy.....xxx";
        movestat2 = "Power........xxx";
        movestat3 = "PP...........xxx";
        movetype = "xxxxxx";
        movelearn = "Learn: Lvl X";
    } else {
        let respm = await fetch(await jsonglobal.moves[move].move.url);
        let jsonm = await respm.json();
        movelearn = "Learn: Lvl " + await jsonglobal.moves[move].version_group_details[0].level_learned_at;
        movename = await jsonglobal.moves[move].move.name;
        movestat1 = await jsonm.accuracy;
        movetype = await jsonm.type.name;
        if (movestat1 == null) {
            movestat1 = "xxx";
        }
        movestat2 = await jsonm.power;
        if (movestat2 == null) {
            movestat2 = "xxx";
        }
        movestat3 = await jsonm.pp;
        if (movestat3 == null) {
            movestat3 = "xxx";
        }
        if (String(movestat1).length == 2) {
            document.getElementById("movestat1").innerHTML = "Accuracy......" + movestat1;
        } else {
            document.getElementById("movestat1").innerHTML = "Accuracy....." + movestat1;
        }
        if (String(movestat2).length == 2) {
            document.getElementById("movestat2").innerHTML = "Power........." + movestat2;
        } else {
            document.getElementById("movestat2").innerHTML = "Power........" + movestat2;
        }
        if (String(movestat3).length == 2) {
            document.getElementById("movestat3").innerHTML = "PP............" + movestat3;
        } else {
            document.getElementById("movestat3").innerHTML = "PP..........." + movestat3;
        }

    }
    document.getElementById("movetotal").innerHTML = movetotal;
    document.getElementById("movename").innerHTML = movename;


    document.getElementById("movetype").innerHTML = movetype;
    document.getElementById("movelearn").innerHTML = movelearn;
}

function togglemoveup() {
    move = move + 1;
    if (move == movetotal) {
        move = 0;
    }
    document.getElementById("movenumber").value = move + 1;
    movesbuild();
}

function togglemovedown() {
    move = move - 1;
    if (move == -1) {
        move = movetotal - 1;
    }
    document.getElementById("movenumber").value = move + 1;
    movesbuild();
}

function movego() {
    temp = document.getElementById("movenumber").value;
    if (temp > -1 && temp < movetotal) {
        move = temp - 1;
        movesbuild();
    }
}

function statsmaker(hp, atk, def, spatk, spdef, speed) {

    document.getElementById("barra0").style.width = hp / 3 + "%";

    document.getElementById("barra1").style.width = atk / 3 + "%";

    document.getElementById("barra2").style.width = def / 3 + "%";

    document.getElementById("barra3").style.width = spatk / 3 + "%";

    document.getElementById("barra4").style.width = spdef / 3 + "%";

    document.getElementById("barra5").style.width = speed / 3 + "%";
}

function textstats(hp, atk, def, spatk, spdef, speed) {


    if (String(hp).length == 2) {
        document.getElementById("linha0").innerHTML = "Hp................" + hp;
    } else {
        document.getElementById("linha0").innerHTML = "Hp..............." + hp;
    }

    if (String(atk).length == 2) {
        document.getElementById("linha1").innerHTML = "Attack............" + atk;
    } else {
        document.getElementById("linha1").innerHTML = "Attack..........." + atk;
    }

    if (String(def).length == 2) {
        document.getElementById("linha2").innerHTML = "Defense..........." + def;
    } else {
        document.getElementById("linha2").innerHTML = "Defense.........." + def;
    }

    if (String(spatk).length == 2) {
        document.getElementById("linha3").innerHTML = "Special-Attack...." + spatk;
    } else {
        document.getElementById("linha3").innerHTML = "Special-Attack..." + spatk;
    }

    if (String(spdef).length == 2) {
        document.getElementById("linha4").innerHTML = "Special-Defense..." + spdef;
    } else {
        document.getElementById("linha4").innerHTML = "Special-Defense.." + spdef;
    }

    if (String(speed).length == 2) {
        document.getElementById("linha5").innerHTML = "Speed............." + speed;
    } else {
        document.getElementById("linha5").innerHTML = "Speed............" + speed;
    }
}

function crossRight() {
    document.getElementById("loader").style.visibility = "visible";
    counter = id;
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    counter = counter + 1;
    if (counter == 899) {
        counter = 1;
    }
    var fetchpokemon = apibase + counter;
    runfetch(fetchpokemon);
}

function crossLeft() {
    document.getElementById("loader").style.visibility = "visible";
    counter = id;
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    counter = counter - 1;
    if (counter == 0) {
        counter = 898;
    }
    var fetchpokemon = apibase + counter;
    runfetch(fetchpokemon);
}

async function speciesfetch(id) {
    fetchspecie = "https://pokeapi.co/api/v2/pokemon-species/" + id;
    let responsespc = await fetch(fetchspecie);
    let jsonspc = await responsespc.json();
    genderratio = await jsonspc.gender_rate;
    female = genderratio / 8 * 100;
    male = 100 - female;
    if (await jsonspc.habitat === null) {
        habitat = "N/A"
    } else {
        habitat = await jsonspc.habitat.name;
    }
    let i = 0;
    while (await jsonspc.flavor_text_entries[i].language.name != "en" && i != 20) {
        i = i + 1;
    }
    document.getElementById("flavorscreen").innerHTML = await jsonspc.flavor_text_entries[i].flavor_text;
    document.getElementById("infogender").innerHTML = "Gender:M" + male + "%-F" + female + "%";
    document.getElementById("infohabitat").innerHTML = "Habitat:" + habitat;
}

function toggleshiny() {
    if (shiny == false) {
        shiny = true;
        document.getElementById("pokemonsprite").style.background = "linear-gradient(14deg, #bf8823 10%, #ffee90 25%, #e6a617 47%, #ffee90 73%, #fff6c8 74%, #ffee90 80%)";
    } else {
        shiny = false;
        document.getElementById("pokemonsprite").style.background = "linear-gradient(15deg, #8191cc 64%, #b7badc 70%, #b7badc 81%, #fff 86%, #b7badc 89%, #b7badc 100%)";
    }
    imagebuilder(id);
}


function toggleback() {
    if (front == true) {
        front = false;
    } else {
        front = true;
    }
    imagebuilder(id);
}


/*if (document.body.className == "comppage"){
  runfetch("https://pokeapi.co/api/v2/pokemon/2")
} */