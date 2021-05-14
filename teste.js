fetch("https://pokeapi.co/api/v2/pokemon/4")
    .then(res => res.json())
    .then(result => {
        console.log(result);


    })