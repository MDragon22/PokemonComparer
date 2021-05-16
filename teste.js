fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(res => res.json())
    .then(result => {
        console.log(result);


    })
