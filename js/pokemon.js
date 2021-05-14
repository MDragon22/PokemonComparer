var id = null;
runfetch("https://pokeapi.co/api/v2/pokemon/1")

function run() {
    loader.style.display = 'block';
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    var input = "error"
    if (document.getElementById("inputpoke").value != "") {
        var input = document.getElementById("inputpoke").value;
    }

    var fetchpokemon = apibase + input;
    runfetch(fetchpokemon);

}

async function runfetch(fetchpokemon) {
    let response = await fetch(fetchpokemon);
    if (response.ok) {
        loader.style.display = 'none';
        let json = await response.json();
        document.getElementById("pokemonsprite").src = await json.sprites.front_default;
        //document.getElementById("pokemonbacksprite").src = await json.sprites.back_default;
        id = await json.id;
        hp = await json.stats[0].base_stat;
        atk = await json.stats[1].base_stat;
        def = await json.stats[2].base_stat
        statsmaker(hp, atk, def);
        name = await json.name;
        nameup = name.charAt(0).toUpperCase() + name.slice(1)
        document.getElementById("pokename").innerHTML = nameup;
        document.getElementById("pokeID").innerHTML = "#" + id;
        type = await json.types[0].type.name;
        document.getElementById("type1").innerHTML = type;
        document.getElementById("type1").setAttribute("name", type);
        if (await json.types.length == 1) {
            document.getElementById("type2").style.display = "none";
        } else {
            document.getElementById("type2").style.display = "block";
            var type = await json.types[1].type.name;
            document.getElementById("type2").innerHTML = type;
            document.getElementById("type2").setAttribute("name", type);
        }
    } else {
        loader.style.display = 'none';
        alert("Pokemon não existe");
    }
}

function statsmaker(hp, atk, def) {
    document.getElementById("barra0").innerHTML = hp;
    document.getElementById("barra0").style.width = hp / 3 + "%";
    document.getElementById("barra1").innerHTML = atk;
    document.getElementById("barra1").style.width = atk / 3 + "%";
    document.getElementById("barra2").innerHTML = def;
    document.getElementById("barra2").style.width = def / 3 + "%";
}

function crossRight() {
    counter = id;
    loader.style.display = 'block';
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    counter = counter + 1;
    if (counter == 899){
      counter = 1;
    }
    var fetchpokemon = apibase + counter;
    runfetch(fetchpokemon);
}

function crossLeft() {
    counter = id;
    loader.style.display = 'block';
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    counter = counter - 1;
    if (counter == 0){
      counter = 898;
    }
    var fetchpokemon = apibase + counter;
    runfetch(fetchpokemon);
}
/*function showstats(){
  var spr = document.getElementById("pokemonsprite");
  if (spr.src != null){
    spr.style.display = "block";
  }
  else{
    spr.style.display = "none";
  }
}*/
/*
var input = document.getElementById("inputpoke");
if(input){
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

     event.preventDefault();
     run();
    }
  });
}*/
