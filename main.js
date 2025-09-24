import { crearHeader } from "./componentes/headerComponent/header.js";
import { seccion2 } from "./componentes/seccionCompras/seccion.js";
import { guardarProductos } from "./controll/milocalStorage.js";



function seccion1() {
   let seccion = document.createElement('section');
   seccion.id = "listaProductos";
   
   guardarProductos([]);
    
    document.body.appendChild(crearHeader());

    
    const contenedorCompras = seccion2();
    seccion.appendChild(contenedorCompras);

   
    document.body.appendChild(seccion);
    return seccion;
}

document.body.appendChild(seccion1());
