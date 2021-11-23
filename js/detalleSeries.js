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

    //Acá empieza la info específica de detalle de serie
    console.log(location.search);

    //guardo la querystring
    const queryString = location.search;
    const queryStringObj = new URLSearchParams(queryString);

    //utilizo el método .get() para solicitarle datos al servidor
    //y guardo los datos obtenidos en una variable para reutilizar
    const id = queryStringObj.get("id");

    //capturo y guardo en variables los elementos del detalle en html usando query selector
    let img = document.querySelector('.detalle-serie img');
    let titulo = document.querySelector('.detalle-serie h2');
    let calificacion = document.querySelector('#calificacion');
    let fecha = document.querySelector('#fecha');
    let duracion = document.querySelector('#duracion');
    let generos = document.querySelector('#genero');
    let sinopsis = document.querySelector('#sinopsis');

    //guardo la apiKey en una variable para que la url quede más prolija (?)
    let apiKey = "6e9de608b8eb72c41459072aa8da9928";
    //guardo la url en una variable para que quede más prolijo
    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`

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

            titulo.innerText = datos.name;

            img.src = `https://image.tmdb.org/t/p/w300${datos.poster_path}`;

            img.alt = datos.name;

            // Al atributo alt, del elemento imagen,
            // le asignamos el valor del título, por si la imagen no se muestra

            //modifico detalle

            //calificacion
            if (datos.vote_average && datos.vote_average != "") {
                calificacion.innerText = `Calificacion: ${datos.vote_average}`;
            }

            //duración
            if (datos.number_of_seasons && datos.number_of_seasons != "") {
                duracion.innerText = `Temporadas: ${datos.number_of_seasons}`;
            }

            //fecha
            if (datos.first_air_date && datos.first_air_date != "") {
                fecha.innerText = `Estreno: ${datos.first_air_date}`;
            }

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
    console.log(id);

    //selecciono el botón "agregar a favoritos"
    let fav = document.querySelector(".fav")

    //defino array favoritos vacío en caso de que no exista
    let favoritosSeries = []

    // recupero datos de storage para ver si ya hay algo en favoritos
    let recuperoStorage = localStorage.getItem("favoritosSeries");

    console.log(recuperoStorage); //da como resultado null, cuando deberia dar array vacío

    //creo un if para saber si ya se definió una propiedad favoritos en storage
    //o si ya hay elementos dentro del LS
    if (recuperoStorage && recuperoStorage != null) {

        //transformo en array
        favoritosSeries = JSON.parse(recuperoStorage);

    }

    //si el id está en la lista
    if (favoritosSeries.includes(id)) {
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
        if (favoritosSeries.includes(id)) {
            //lo localizo en el array usando el método indexOf()
            let aBorrar = favoritosSeries.indexOf(id);
            //lo saco
            favoritosSeries.splice(aBorrar, 1);
            //innerHTML para modificar el boton de agregar/quitar a favoritos
            fav.innerHTML = `
        agregar a favoritos
        <span class="material-icons">favorite_border</span>
        `
        } else { //en caso de que NO esté en la lista...
            //agrego la película a la lista
            favoritosSeries.push(id);
            //cambio el btn
            fav.innerHTML = `
        quitar de favoritos
        <span class="material-icons">favorite</span>
        `
        }
        //por último transformo el array en string y lo guardo en una variable
        let favoritosStorage = JSON.stringify(favoritosSeries);
        //y guardo el string en LS
        localStorage.setItem("favoritosSeries", favoritosStorage);
        console.log(favoritosStorage);

    })


});
