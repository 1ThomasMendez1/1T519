// Que todo el script se ejecute cuando se cargue por completo la pagina
window.addEventListener('load', function() {


 // Seleccion de objetos del DOM para poner la informacion que se trajo
 const alertaBuscador = document.querySelector (".buscador");
 const campo = document.querySelector (".campo");
 const mensaje1 = document.querySelector (".alertadebuscador1");
 const mensaje2 = document.querySelector (".alertadebuscador2");
 const indexlistaP = document.querySelector(".indexlistaP")
 const indexlistaPP = document.querySelector(".indexlistaPP")
 const indexlistaS = document.querySelector(".indexlistaS")


 // Evaluacion del contenido de la caja del buscador
 alertaBuscador.addEventListener('submit',function(e) { 

    // Se le quita su funcion default
    e.preventDefault()

    // Se plantea un condicional para comprobar lo ingresado en el campo
    if  (campo.value == "") {
        mensaje1.style.visibility = "visible";
 }  else if (campo.value.length < 3 ) {
        mensaje2.style.visibility = "visible"
    } else {
        this.submit(`${campo}`)
 }
 });
 
 
 //Pido la info sobre las pelis populares
 fetch('https://api.themoviedb.org/3/movie/popular?api_key=923e730c041add0f009363ab43cb392a')

  // La convierto en un objeto literal
  .then(function (respuesta) {
      return respuesta.json();     
  })

  // Trabajo con la informacion
  .then(function (datos) {

    // Guardo en una variable la cantidad de resultados
    let pelis = datos.results
    
    // Planteo el bucle para modificar el dom con template literals y lo planteo de tal forma que no traiga mas de 5 elementos
    for (let i = 0; i < 5; i++ ) {
        indexlistaP.innerHTML += `
        <li>                        
        <h2>${pelis[i].title}</h2>
        <h2>${pelis[i].release_date}</h2>
        <a href="detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w300/${pelis[i].poster_path}" alt="starwars"> </a>
        <input type="checkbox" name="favoritos">                                
        </li>        
        `
    }
  })

  // Error en caso de no funcionar 
  .catch(function (error) {
      alert("Hubo un error intentelo nuevamente luego")
  })


   //Pido la info sobre las pelis top rated
 fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=923e730c041add0f009363ab43cb392a')
  .then(function (respuesta) {
      return respuesta.json();
  })

  .then(function (datos) {

    let pelisPP = datos.results

    for (let i = 0; i < 5; i++ ) {
        indexlistaPP.innerHTML += `
        <li>                        
        <h2>${pelisPP[i].title}</h2>
        <h2>${pelisPP[i].release_date}</h2>
        <a href="detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w300/${pelisPP[i].poster_path}" alt="starwars"> </a>
        <input type="checkbox" name="favoritos">                                
        </li>        
        `
    }
  })

  .catch(function (error) {
      alert("Hubo un error intentelo nuevamente luego")
  }) 


  // Pido la info de las series mas populares
 fetch(' https://api.themoviedb.org/3/tv/popular?api_key=923e730c041add0f009363ab43cb392a ')
  .then(function (respuesta) {
      return respuesta.json();
  })

  .then(function (datos) {
    let pelisS = datos.results
    
    for (let i = 0; i < 5; i++ ) {
        indexlistaS.innerHTML += `
        <li>                        
        <h2 class="seriesindex">${pelisS[i].name}</h2>
        <h2>${pelisS[i].first_air_date}</h2>
        <a href="detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w300/${pelisS[i].poster_path}" alt="starwars"> </a>
        <input type="checkbox" name="favoritos">                                
        </li>        
        `
    }
  })

  .catch(function (error) {
      alert("Hubo un error intentelo nuevamente luego")
  })

});
