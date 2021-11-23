window.addEventListener("load", function () {

    //BUSCADOR

    // Seleccion de objetos del DOM para poner la informacion que se trajo
    const alertaBuscador = document.querySelector(".buscador");
    const campo = document.querySelector(".campo");
    const mensaje1 = document.querySelector(".alertadebuscador1");
    const mensaje2 = document.querySelector(".alertadebuscador2");


    // Evaluacion del contenido de la caja del buscador
    alertaBuscador.addEventListener('submit', function (e) {

        // Se le quita su funcion default
        e.preventDefault()

        // Se plantea un condicional para comprobar lo ingresado en el campo
        if (campo.value == "") {
            mensaje1.style.visibility = "visible";
        } else if (campo.value.length < 3) {
            mensaje2.style.visibility = "visible"
        } else {
            this.submit(`${campo}`)
        }
    });

    //Aca empieza info específica de detalle de película
    console.log(location.search);

    //guardo la querystring
    const queryString = location.search;
    const queryStringObj = new URLSearchParams(queryString);

    //utilizo el método .get() para solicitarle datos al servidor
    //y guardo los datos obtenidos en una variable para reutilizar
    const cual = queryStringObj.get('id');

    //capturo y guardo en variables los elementos del detalle en html usando query selector
    let img = document.querySelector('.detalle-pelicula img');
    let titulo = document.querySelector('.detalle-pelicula h2');
    let calificacion = document.querySelector('#calificacion');
    let fecha = document.querySelector('#fecha');
    let duracion = document.querySelector('#duracion');
    let generos = document.querySelector('#genero');
    let sinopsis = document.querySelector('#sinopsis');

    //guardo la apiKey en una variable para que la url quede más prolija (?)
    let apiKey = "6e9de608b8eb72c41459072aa8da9928";
    //guardo la url en una variable para que quede más prolijo
    let url = `https://api.themoviedb.org/3/movie/${cual}?api_key=${apiKey}`

    //utilizo fetch para traer la info
    fetch(url)
        // una vez que tengo la info, la paso a datos manejables con un .json()
        .then(function (rta) {
            return rta.json();
        })
        //imprimo en consola
        .then(function (datos) {

            console.log(datos);
            //se guarda en variable para código más limpio
            let pelis = datos.results

            //reasigno el valor de las variables  (?)



            titulo.innerText = datos.title;

            img.src = `https://image.tmdb.org/t/p/w300${datos.poster_path}`;

            img.alt = datos.title;

            //modifico detalle

            //calificacion
            if (datos.vote_average && datos.vote_average != "") {
                calificacion.innerText = `Calificacion: ${datos.vote_average}`;
            }

            //duración
            if (datos.runtime && datos.runtime != "") {
                duracion.innerText = `Duracion: ${datos.runtime} minutos`;
            }

            //fecha
            if (datos.release_date && datos.release_date != "") {
                fecha.innerText = `Estreno: ${datos.release_date}`;
            }
            let generoArray = []
            generos.innerText = `Generos: `
            //genero
            if (datos.genres && datos.genres != "") {
                generos.innerText = `Generos:`
                generoArray = datos.genres
                for (let i = 0; i < generoArray.length; i++) {
                    generos.innerHTML += `<a href="/detalle.genero.html?id=<${generoArray[i].id}"> ${generoArray[i].name} </a>`
                }

            }

            //sinopsis
            if (datos.overview && datos.overview != "") {
                sinopsis.innerText = `${datos.overview}`
            }
        })

        .catch(function (error) {
            console.log(error);
        });


    // favoritos
    console.log(cual);

    //selecciono el botón "agregar a favoritos"
    let fav = document.querySelector(".fav")

    //defino array favoritos vacío en caso de que no exista
    let favoritos = []

    // recupero datos de storage para ver si ya hay algo en favoritos
    let recuperoStorage = localStorage.getItem("favoritos");

    console.log(recuperoStorage); //da como resultado null, cuando deberia dar array vacío

    //creo un if para saber si ya se definió una propiedad favoritos en storage
    //o si ya hay elementos dentro del LS
    if (recuperoStorage && recuperoStorage != null) {

        //transformo en array
        favoritos = JSON.parse(recuperoStorage);

    }

    //si el id está en la lista
    if (favoritos.includes(cual)) {
        //cambio el contenido del botón, en vez de agregar, quitar.
        fav.innerHTML = `
    quitar de favoritos
    <span class="material-icons">favorite</span>
    `
    }

    //agregar o sacar de favoritos
    //hago un evento
    fav.addEventListener("click", function (e) {
        //para evitar comportamiento predeterminado hago un prevent default
        e.preventDefault()

        //si la pelicula está en la lista
        if (favoritos.includes(cual)) {
            //lo localizo en el array usando el método indexOf()
            let aBorrar = favoritos.indexOf(cual);
            //lo saco
            favoritos.splice(aBorrar, 1);
            //innerHTML para modificar el boton de agregar/quitar a favoritos
            fav.innerHTML = `
        agregar a favoritos
        <span class="material-icons">favorite_border</span>
        `
        } else { //en caso de que NO esté en la lista...
            //agrego la película a la lista
            favoritos.push(cual);
            //cambio el btn
            fav.innerHTML = `
        quitar de favoritos
        <span class="material-icons">favorite</span>
        `
        }
        //por último transformo el array en string y lo guardo en una variable
        let favoritosStorage = JSON.stringify(favoritos);
        //y guardo el string en LS
        localStorage.setItem("favoritos", favoritosStorage);
        console.log(favoritosStorage);

    })

});
