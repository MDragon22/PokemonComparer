function run() {
    loader.style.display = 'block';
    var apibase = "https://pokeapi.co/api/v2/pokemon/";
    var input = "error"
    if (document.getElementById("inputpoke").value != ""){
      var input = document.getElementById("inputpoke").value;
    }

    var fetchpokemon = apibase + input;
    runfetch(fetchpokemon);

}
async function response(fetchpokemon){

}
async function runfetch(fetchpokemon) {
  let response = await fetch(fetchpokemon);

  if (response.ok){
    loader.style.display = 'none';
    let json = await response.json();
    document.getElementById("pokemonsprite").src = await json.sprites.front_default;
  }else{
    loader.style.display = 'none';
    alert("HTTP-Error: " + response.status);
  }



    /*fetch(fetchpokemon)
        .then(res => res.json())
        .then(result => {
            console.log(result.status);
            document.getElementById("demo").innerHTML = result.name;
            document.getElementById("pokemonsprite").src = result.sprites.front_default;
            showstats();
        })*/
}

/*function showstats(){
  var spr = document.getElementById("pokemonsprite");
  if (spr.src != null){
    spr.style.display = "block";
  }
  else{
    spr.style.display = "none";
  }
}

var input = document.getElementById("inputpoke");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {

   event.preventDefault();
   run();
  }
});*/
