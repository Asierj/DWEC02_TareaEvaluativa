'use strict'

console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------

//Necesitaremos usar el arraySocios en varios puntos, queda como de scope general, aunque sin datos
let arraySocios = []; 

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre')

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById('contenedorPintarSocios')

//Iniciar los cuadros de texto con nombre y apellido propio, tal como se ha solicitado en ejercicio
document.getElementById("fnombre").defaultValue = "Asier";
document.getElementById("fapellido").defaultValue = "Jaio";

// Carga inicial de datos
cargarSociosJSON();

// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarSociosJSON () {
  let path = 'model/datosSocios.json';

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  });

//Obtener los datos y pasarlos a aniadirSociosInicialesArray()

  fetch(request).then(response => {
    response.json().then(data => {
      console.log(data);
      aniadirSociosInicialesArray (data);
    })
  })


}


/* 
Metodo para añadir socios al array cuando arranca la pagina web
*/
function aniadirSociosInicialesArray (data) {
  //Cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array.
  //Hay varias formas de hacerlo, en este caso, usaremos el forEach 
  //Otras opciones: probar con bucle.

  data.forEach((item) => {
    //Por si acaso, reiniciaremos el objeto socio y lo rellenaremos en cada vuelta
    let socio = {};
    socio=[item.id,item.Nombre,item.Apellido];
    //Añadimos socio
    arraySocios.push(socio);
  });
}



/*
 Metodo para capturar los datos del socio introducido en el formulario y pasarlos a crearSocio()
*/

function capturarDatosSocio () {

  //Conseguir los datos (o mejor, su valor para no provocar errores)	
  let nombren = document.getElementById("fnombre").value;
  let apellidon = document.getElementById("fapellido").value;
  //Pasamos los datos a Crearsocio
  crearSocio(nombren,apellidon);
}

/* 
    Metodo para crear un socio pasandole el nombre y el apellido y añadirlo al array
 */

function crearSocio (nombren,apellidon) {

  //NuevoID para completar socio
  let idn = crearID ();
  //Generar un nuevo objeto tipo socio
  let socio = [idn,nombren,apellidon];
  // Adjuntar al final del array que se ha generado al principio
  arraySocios.push(socio);
}

/*
Crear y devolver ID del socio en funcion del ultimo ID que hay en el array de socios
*/
function crearID () {
  // Mira el id del ultimo socio del array y sumarle uno. Puede hacerse de varias formas, 
  // este ejemplo funciona incluso si el ID no es contiguo:
  let j = 1; //Por si no hubiera socios y el arraysocios estuviera vacío.
  for (let k = 0; k < arraySocios.length; k++) {
     if (j <= arraySocios[k][0] ){
	j = arraySocios[k][0] + 1;
     }
  }
  //Devolvemos j para su uso en CrearSocio.
  return (j);
}

// EJERCICIO 2

/*
  Metodo que eliminar la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/

function pintarListaSocios () {

  //Borrar todo lo que pueda haber previo. Ha varias formas, pero, por ejemplo, podemos borrar todos los "hijos".
  let div = document.getElementById("contenedorPintarSocios");
  div.replaceChildren();

 //Bucle simple para recorrer y pintar el array de socios usando objetos tipo "p" e innerHTML
   
 for (let i = 0; i < arraySocios.length; ++i) {
  var p = document.createElement('p');
  p.innerHTML = 'Socio numero '+ arraySocios[i][0] + ': ' + arraySocios[i][1] + ' ' + arraySocios[i][2];
  div.appendChild(p);
 };

};

// ------------------- MAIN ------------------------

console.log('Acaba el programa')
