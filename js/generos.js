window.addEventListener('load', function () {

    //Declaramos las variables para el buscador

    const alertaBuscador = document.querySelector(".buscador");
    const campo = document.querySelector(".campo");
    const mensaje1 = document.querySelector(".alertadebuscador1");
    const mensaje2 = document.querySelector(".alertadebuscador2");

    // Evaluacion del contenido de la caja del buscador
    alertaBuscador.addEventListener('submit', function (e) {
        e.preventDefault()
        if (campo.value == "") {
            mensaje1.style.visibility = "visible";
        } else if (campo.value.length < 3) {
            mensaje2.style.visibility = "visible"
        } else {
            this.submit(`${campo}`)
        }

    });



// Peliculas

    // Mediante la variable let, le asigno el nombre "url" a la api.
    let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=819b7c86c8607512f0fdebc52441505d&language=en-US';

    //Empiezo un fetch con el parametro "url", con el fin de consultarte la informacion a la api.

    fetch(url)

        // El primer then recibe la informacion en formato json, y la transforma en un array para que sea manipulable.
        .then(function (data) {
            return data.json();
        })
        // El segundo then recibe la informacion ya en array y nos la muestra para que podamos trabajar sobre ella ??
        .then(function (data) {
            colocarGeneros(data);
        });

    // Con esta funcion anunciamos que trabajaremos sobre la data obtenida en el .then anterior
    function colocarGeneros(data) {

        // Mediante la variable let le asignamos el nombre listado a la section del html que tiene id=listadoPeliculas (por eso se usa #)

        let listado = document.querySelector('#listadoPeliculas');

        // Con la sintaxis de punto indicamos que vamos a trabajar sobre "listado", y con innerHtml indicamos que vamos a modificar la estructura de
        // listado desde el js.

        listado.innerHTML = '';

        // Empezamos un bucle.

        for (let i = 0; i < data.genres.length; i++) {
            let id = data.genres[i].id;
            let nombre = data.genres[i].name;
            listado.innerHTML += `<article class="generosclase"><a href="./detalle.genero.html?id=${id}&genero=${nombre}&tipo=peliculas">${nombre}</a></article>`;
        }
    }


// Mismo mecanismo, pero para Series.
    url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=819b7c86c8607512f0fdebc52441505d&language=en-US&page=1';

    fetch(url)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            colocarGenerosSeries(data);
        });

    function colocarGenerosSeries(data) {

        let listado = document.querySelector('#listadoSeries');

        listado.innerHTML = '';

        for (let i = 0; i < data.genres.length; i++) {
            let id = data.genres[i].id;
            let nombre = data.genres[i].name;
            listado.innerHTML += `<article class="generosclase"><a href="./detalle.genero.html?id=${id}&genero=${nombre}&tipo=series">${nombre}</a></article>`;
        }

    }

})
