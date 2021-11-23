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



    //Listado de favoritos

    //guardo la querystring
    const queryString = location.search;
    const queryStringObj = new URLSearchParams(queryString);

    //utilizo el método .get() para solicitarle datos al servidor
    //y guardo los datos obtenidos en una variable para reutilizar
    const cual = queryStringObj.get('id');

    // defino "favoritos" como array vacío, por si no se creó en el LS
    let favoritosPelis = [];
    let favoritosSeries = []
    console.log(favoritosPelis);
    console.log(favoritosSeries);
    console.log(localStorage);

    //PELICULAS
    // si fue creada la clave "favoritos" en LS
    if (localStorage.getItem("favoritos")) {

        // console.log para ver como llegan los datos (strings)
        console.log(localStorage);

        // guardo los datos del storage en una variable
        let recuperoStorage = localStorage.getItem("favoritos")

        // transformo en array / parseo
        favoritosPelis = JSON.parse(recuperoStorage)

        // verifico la transformacion y veo como quedaron los datos


    }


    // capturo la sección de la lista de favoritos
    const seccion = document.querySelector("#pelis")

    // si NO hay favoritos en la lista
    if (favoritosPelis.length == 0) {

        // muestro "no hay favoritos" en un "article" usando innerHTML para modificar etiquetas

        seccion.innerHTML += `
     <article>
     <h3> No hay peliculas en tu lista de favoritos </h3>
     </article>
     `

    } else { // Si SI hay favoritos en el array "favoritos"


        // busca cada uno de las peliculas o series y los imprime en pantalla

        for (let i = 0; i < favoritosPelis.length; i++) { // para cada elemento del array favoritos, haga algo


            buscarYMostrarFavoritos(favoritosPelis[i]); // PARA QUE QUEDE MÁS PROLIJO DEFINO LAS INSTRUCCIONES DESPUÉS
            //LA FUNCIÓN POR MÁS QUE SEA DEFINIDA DESPUÉS, FUNCIONA DESDE EL PRINCIPIO.

        }

    }
    //Defino la función invocada en el bucle como hicimos en clase
    function buscarYMostrarFavoritos(cual) {

        // guardo la url en una variable para que quede más prolijo
        // los parámetros de la funcion y la variable en el query string deben ser iguales!!
        let apiKey = "6e9de608b8eb72c41459072aa8da9928"
        let url = `https://api.themoviedb.org/3/movie/${cual}?api_key=${apiKey}`

        // utilizo un fetch para traer los datos desde la API
        // luego un .then para transformar esos datos en algo manejable con un .json()

        fetch(url)
            .then(function (respuesta) {

                return respuesta.json()

            })
            .then(function (datos) {
                console.log(datos);

                // guardo lo que me sirve en una variable

                //console.log() para verificar los datos que guardé en la variable

                // agrego a la sección
                // cada pelicula o serie favorita en un article con:
                // h3 con título que sea vínculo a la página de detalles e img cn alt 
                seccion.innerHTML += `
                    <article>
                    <h3>${datos.title}</h3>
                    <img src="https://image.tmdb.org/t/p/w300${datos.poster_path}" alt="${datos.title}"> 
                    </article>
                   `
                //selecciono titulo e imagen en el objeto literal
            })

    }

    //SERIES
    // si fue creada la clave "favoritosSeries" en LS
    if (localStorage.getItem("favoritosSeries")) {

        // console.log para ver como llegan los datos (strings)
        console.log(localStorage);

        // guardo los datos del storage en una variable
        let recuperoStorage = localStorage.getItem("favoritosSeries")

        // transformo en array / parseo
        favoritosSeries = JSON.parse(recuperoStorage)

        // verifico la transformacion y veo como quedaron los datos


    }


    // capturo la sección de la lista de favoritos
    const seriesFav = document.querySelector("#series")

    // si NO hay favoritos en la lista
    if (favoritosSeries.length == 0) {

        // muestro "no hay favoritos" en un "article" usando innerHTML para modificar etiquetas

        seriesFav.innerHTML += `
     <article>
     <h3> No hay series en tu lista de favoritos </h3>
     </article>
     `

    } else { // Si SI hay favoritos en el array "favoritos"


        // busca cada uno de las peliculas o series y los imprime en pantalla

        for (let i = 0; i < favoritosSeries.length; i++) { // para cada elemento del array favoritos, haga algo


            buscarYMostrarFavoritosSeries(favoritosSeries[i]); // PARA QUE QUEDE MÁS PROLIJO DEFINO LAS INSTRUCCIONES DESPUÉS
            //LA FUNCIÓN POR MÁS QUE SEA DEFINIDA DESPUÉS, FUNCIONA DESDE EL PRINCIPIO.

        }

    }
    //Defino la función invocada en el bucle como hicimos en clase
    function buscarYMostrarFavoritosSeries(cual) {

        // guardo la url en una variable para que quede más prolijo
        // los parámetros de la funcion y la variable en el query string deben ser iguales!!
        let apiKey = "6e9de608b8eb72c41459072aa8da9928"
        let url = `https://api.themoviedb.org/3/tv/${cual}?api_key=${apiKey}&language=en-US`

        // utilizo un fetch para traer los datos desde la API
        // luego un .then para transformar esos datos en algo manejable con un .json()

        fetch(url)
            .then(function (respuesta) {

                return respuesta.json()

            })
            .then(function (datos) {
                console.log(datos);

                // guardo lo que me sirve en una variable

                //console.log() para verificar los datos que guardé en la variable

                // agrego a la sección
                // cada pelicula o serie favorita en un article con:
                // h3 con título que sea vínculo a la página de detalles e img cn alt 
                seriesFav.innerHTML += `
                    <article>
                    <h3>${datos.name}</h3>
                    <img src="https://image.tmdb.org/t/p/w300${datos.poster_path}" alt="${datos.name}"> 
                    </article>
                   `
                //selecciono titulo e imagen en el objeto literal
            })

    }



});
