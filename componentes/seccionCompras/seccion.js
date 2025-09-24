import { obtenerProductos, guardarProductos } from "../../controll/milocalStorage.js";
import { descargar } from "../../controll/descargar.js";

function seccion2() {
    let contenedor = document.createElement('div');
    contenedor.className = "contenedor-compras";

    
    let titulo = document.createElement('h2');
    titulo.className = "titulo-compras";
    titulo.innerText = "TOTAL DE COMPRAS";
    contenedor.appendChild(titulo);

  
    let img = document.createElement('img');
    img.className = "btn-descarga";
    img.src = "./assets/descarga.png";
    img.style.cursor = "pointer";
    titulo.appendChild(img);

    
    let subTitulo = document.createElement('h3');
    subTitulo.className = "subtitulo-compras";
    subTitulo.innerText = "Lista de Compras";
    contenedor.appendChild(subTitulo);

    
    let contEditable = document.createElement('div');
    contEditable.className = "contenedor-editables";

    let nombreEditable = document.createElement('div');
    nombreEditable.className = "editable-nombre";
    nombreEditable.setAttribute("contentEditable", "");
    nombreEditable.innerText = "Producto/Servicio";
    contEditable.appendChild(nombreEditable);

    let precioEditable = document.createElement('div');
    precioEditable.className = "editable-precio";
    precioEditable.setAttribute("contentEditable", "");
    precioEditable.innerText = "Precio/cantidad";
    contEditable.appendChild(precioEditable);

    let botonAgregar = document.createElement('button');
    botonAgregar.className = "btn-agregar";
    botonAgregar.innerText = "Agregar";
    contEditable.appendChild(botonAgregar);

    contenedor.appendChild(contEditable);

    
    let contListaTotal = document.createElement('div');
    contListaTotal.id = "soloLista"; 
    contenedor.appendChild(contListaTotal);

    
    let total = document.createElement('h3');
    total.className = "total-monto";
    total.innerText = "Q. 0.00";
    contListaTotal.appendChild(total);

   
    let contListaProductos = document.createElement('div');
    contListaProductos.className = "lista-productos";
    contListaTotal.appendChild(contListaProductos);

    
    img.addEventListener("click", () => {
        descargar("soloLista");
    });

    
    botonAgregar.addEventListener('click', () => {
        let nombre = nombreEditable.innerText; 
        let precioTexto = precioEditable.innerText;

  
        let precio = parseFloat(precioTexto.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;

      
        let carritoLocalStorage = obtenerProductos();
        carritoLocalStorage.push({ nombre, precio });
        guardarProductos(carritoLocalStorage);

      
        contListaProductos.innerHTML = "";

       
        let sumaTotal = 0;
        carritoLocalStorage.forEach((p) => {
            let item = document.createElement('div');
            item.className = "item-producto";
            item.innerText = `${p.nombre} - Q. ${p.precio.toFixed(2)}`;
            contListaProductos.appendChild(item);

            sumaTotal += p.precio;
        });

     
        total.innerText = `Q. ${sumaTotal.toFixed(2)}`;
    });

    return contenedor;
}

export { seccion2 };
