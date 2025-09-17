import { obtenerProductos, guardarProductos } from "../../controll/milocalStorage.js";

function seccion2() {
    let contenedor = document.createElement('div');
    contenedor.className = "contenedor-compras";

    let titulo = document.createElement('h2');
    titulo.className = "titulo-compras";
    titulo.innerText = "TOTAL DE COMPRAS";
    contenedor.appendChild(titulo);

    let img = document.createElement('img');
    img.className= "btn-descarga";
    img.src="./assets/descarga.png";
    titulo.appendChild(img);

    // El total
    let total = document.createElement('h3');
    total.className = "total-monto";
    total.innerText = "Q. 00.00";
    contenedor.appendChild(total);

    // Subtitulo
    let subTitulo = document.createElement('h3');
    subTitulo.className = "subtitulo-compras";
    subTitulo.innerText = "Lista de Compras";
    contenedor.appendChild(subTitulo);

    //Cajas
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

    //  Contenedor para los productos 
    let contListaProductos = document.createElement('div');
    contListaProductos.className = "lista-productos";
    contenedor.appendChild(contListaProductos);

    //  Evento botón Agregar 
    botonAgregar.addEventListener('click', () => {
        let nombre = nombreEditable.innerText; 
        let precio = precioEditable.innerText;

        // Crear div del producto
        let item = document.createElement('div');
        item.className = "item-producto";
        item.innerText = `${nombre} - Q. ${precio}`;
        contListaProductos.appendChild(item);

        // Guardar en localStorage
        let carritoLocalStorage = obtenerProductos();
        carritoLocalStorage.push({ nombre, precio });
        guardarProductos(carritoLocalStorage);

        console.log("Producto agregado al Local Storage:", { nombre, precio });

    });

    return contenedor;
}

export { seccion2 };