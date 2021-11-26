
// Cargado de la pagina 
window.addEventListener('load', function() {


 // Loader que luego de cargarse la pagina, se le agrega una clase para ocultarse.
 const loader = document.querySelector(".loader")
 loader.className += " hidden";

 // Guardo la query stryng de lo tipeado en el form de busqueda en un formato trabajable
 const parametros = new URLSearchParams(location.search);

 // Guardo el valor de lo que se busco en una variable
 const buscado = parametros.get('q');

 // Seleccion de adonde voy a poner la info y lo que voy a editar
 const titulo = document.querySelector('.tituloDeLoBuscado');
 const listaDeResultadosP = document.querySelector('.busquedalistaP')
 const listaDeResultadosS = document.querySelector('.busquedalistaS')
 const noConcluyePeli = document.querySelector('.nopeli')
 const noConcluyeSerie = document.querySelector('.noserie')

 
  //Fetch de los datos sobre relacionado a peliculas
  fetch( `https://api.themoviedb.org/3/search/movie?api_key=923e730c041add0f009363ab43cb392a&language=en-US&query=${buscado}&page=1&include_adult=false` )

    // El primer then, la promesa se cumplio, convierto la respuesta en un objeto literal
    .then(function (respuesta) {
      return respuesta.json();
    })
    
    // Con la informacion convertida, trabajo
    .then(function (data) {
     
     // Modifico el titulo con lo tipeado en el campo de busqueda  
     titulo.innerHTML = `
     Informacion de "${buscado}"
     `

     // Guardo en una variable la cantidad de resultados que devolvio el fetch, relacionado a lo que se tipeo
     let cantidadP = data.results.length
     
     // En base a la cantidad de resultados, hay un condicional, si no se muestra nada, se muestra un cartel notificando
     if (cantidadP == 0) {
      noConcluyePeli.style.visibility = "visible";
      noConcluyePeli.style.height = "50px";
      listaDeResultadosP.style.visibility = "hidden";
      } else {

        // En caso de mostrar resultados, a traves de un bucle, muestro no mas de 5 resultados
        for (let i = 0; i < 5;i++) {
         listaDeResultadosP.innerHTML += `
         <li>                        
         <h2>${data.results[i].title}</h2>
         <h2>${data.results[i].release_date}</h2> 
         <a href="detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w300/${data.results[i].poster_path}" alt="No se encontro la imagen"> </a>
         <input type="checkbox" name="favoritos">                             
         </li> 
         `
        }   
      }
    })
    
    // Error configurado en caso de que falle la promesa
    .catch(function (error) {
        alert("Ocurrio un error!")
    })
    
  
  
   //Fetch de los datos sobre relacionado a series
  fetch (`https://api.themoviedb.org/3/search/tv?api_key=923e730c041add0f009363ab43cb392a&language=en-US&page=1&query=${buscado}&include_adult=false`)

    // El primer then, la promesa se cumplio, convierto la respuestaa en un objeto literal
    .then(function (respuestaa) {
    return respuestaa.json();
   })
  
   // Con la informacion convertida, trabajo
   .then(function (datos) {
   
   // Guardo en una variable la cantidad de resultados que devolvio el fetch, relacionado a lo que se tipeo
   let cantidad = datos.results.length
   
   // En base a la cantidad de resultados, hay un condicional, si no se muestra nada, se muestra un cartel notificando
   if (cantidad == 0) {
    noConcluyeSerie.style.visibility = "visible"
    noConcluyeSerie.style.height = "50px"
    listaDeResultadosS.style.visibility = "hidden";
    } else {

      // En caso de mostrar resultados, a traves de un bucle, muestro no mas de 5 resultados
      // Uso template literals para llamar a la informacion que ya defini y esta almacenada dentro del objeto literal
      for (let i = 0; i < 5;i++) {
        listaDeResultadosS.innerHTML += `
       <li> 
       <h2>${datos.results[i].name}</h2>
       <h2>${datos.results[i].first_air_date}</h2> 
       <a href="detalle-pelicula.html?id=${data.results[i].id}"> <img src="https://image.tmdb.org/t/p/w300/${datos.results[i].poster_path}" alt="No hay imagen"> </a>
       <input type="checkbox" name="favoritos">                             
       </li> 
       `
      }   
    }
  })

  // Error configurado en caso de que falle la promesa
  .catch(function (error) {
    alert("Ocurrio un error!")
 })


});




