import { obtenerProductos, guardarProductos } from "./controll/milocalStorage.js";
import { crearHeader } from "./componentes/headerComponent/header.js";
import { seccion2 } from "./componentes/seccionCompras/seccion.js";

function seccion1 (){
   let seccion = document.createElement('section');
   let listaProductos = obtenerProductos();

   if(listaProductos.length === 0){
        listaProductos = [];
        guardarProductos(listaProductos);
   }

   console.log(listaProductos);

   document.body.appendChild(crearHeader());
   document.body.appendChild(seccion2());

   return seccion;
}

document.body.appendChild(seccion1());