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

    // La primera linea es una funcion de javascript, que te va a devolver un objeto.

    const urlParams = new URLSearchParams(location.search);

    // En esta linea, mediante la variable designada antes, y el metodo get, podremos conseguir los valores del "id", y luego lo mismo haremos con 
    // "genero" y con "tipo".

    const id = urlParams.get('id');
    const genero = urlParams.get('genero');
    const tipo = urlParams.get('tipo');

    // Tenemos una variable url con un condicional, que nos indican que dependiendo que seleccione el usuario (Pelicula o Serie), cambiara el valor // de "url".
    let url;

    if (tipo == 'series') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=6e9de608b8eb72c41459072aa8da9928&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`;
    }

    else {
        url = ` https://api.themoviedb.org/3/discover/movie?api_key=6e9de608b8eb72c41459072aa8da9928&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`;
    }


    // Usamos un selector modfiicador del DOM que es Document.QuerySelector para capturar h1dgenero que es una section de nuestro html, y le asignamos el nombre titulo. Luego con la propiedad innerText le asignamos la variable genero, de manera que el titulo sea el genero seleccionado por el usuario. 

    let titulo = document.querySelector(".h1dgenero");

    titulo.innerText += genero;

    // Empezamos un fetch, con el primer then que baja la informacion de la API, y la transforma de json a un objeto literal para que podamos manipularla y trabajarla. Y con un segundo then que nos permite trabajar ya con ese objeto que viene del then anterior.

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Le asignamos el nombre "listado", a la <ul> llamada "uldetallegenero" mediante el selector modificador del DOM document.queryselector()

            let listado = document.querySelector('.uldetallegenero');

            // Empieza un bucle con la palabra reservada for, en el inicio declaramos que el indice = 0; en la condicion nos fijamos mediante la propiedad .length la cantidad de elementos que tiene el objeto para saber cuantas veces se debera recorrer el mismo, y al final declaramos que se recorrera de uno en uno.

            for (let i = 0; i < data.results.length; i++) {

                // En este condicional preguntamos mediante data.results[i] si la pelicula/serie seleccionada tiene imagen de portada, es decir si el backdrop_path no es nulo.
                if (data.results[i].backdrop_path != null) {



                    let id = data.results[i].id;
                    // Con esto 
                    let foto = 'https://image.tmdb.org/t/p/w342' + data.results[i].backdrop_path;
                    let nombre;

                    //pregunto si es serie o pelicula entonces saco el nombre del objeto


                    if (tipo == 'series') {
                        // Con esto accedemos al "id" y al "name" de la serie, para luego mediante el innerhtml ponerla dentro de la estructura
                        let id = data.results[i].id;
                        let nombre = data.results[i].name;
                        listado.innerHTML += `
                        <li>
                        <a href="./detalle-serie.html?id=${id}">
                            <img class="imgh" src="https://image.tmdb.org/t/p/w342${data.results[i].backdrop_path}" alt="">
                        </a>
                        <h3 class="h3clase">${nombre}</h3>
                    </li>`;
                    }

                    if (tipo == 'peliculas') {
                        // Con esto accedemos al "id" y al "name" de la pelicula, para luego mediante el innerhtml ponerla dentro de la estructura
                        let id = data.results[i].id;
                        let nombre = data.results[i].title;
                        listado.innerHTML += `
                        <li>
                        <a href="./detalle-pelicula.html?id=${id}">
                            <img class="imgh" src="https://image.tmdb.org/t/p/w342${data.results[i].backdrop_path}" alt="">
                        </a>
                        <h3 class="h3clase">${nombre}</h3>
                    </li>`; 

                    }
                }

            }
        })



})
