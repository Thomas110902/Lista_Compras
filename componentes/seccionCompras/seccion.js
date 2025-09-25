import { obtenerProductos, guardarProductos } from "../../controll/milocalStorage.js";
import { descargar } from "../../controll/descargar.js";

function seccion2() {

    // Función para manejar el placeholder editable
    function aplicarPlaceholder(editableDiv, textoPlaceholder) {
        editableDiv.innerText = textoPlaceholder;

        editableDiv.addEventListener('focus', () => {
            if (editableDiv.innerText === textoPlaceholder) {
                editableDiv.innerText = ""; // limpiar al hacer click
            }
        });

        editableDiv.addEventListener('blur', () => {
            if (editableDiv.innerText.trim() === "") {
                editableDiv.innerText = textoPlaceholder; // restaurar si está vacío
            }
        });
    }

    let contenedor = document.createElement('div');
    contenedor.className = "contenedor-compras";

    // Título principal
    let titulo = document.createElement('h2');
    titulo.className = "titulo-compras";
    titulo.innerText = "TOTAL DE COMPRAS";
    contenedor.appendChild(titulo);

    // Botón de descarga (imagen)
    let img = document.createElement('img');
    img.className = "btn-descarga";
    img.src = "./assets/descarga.png";
    img.style.cursor = "pointer";
    titulo.appendChild(img);

    // Contenedor que tendrá solo lo que quiero descargar (total + lista)
    let contListaYTotal = document.createElement('div');
    contListaYTotal.id = "soloLista"; // 👈 este se descarga
    contenedor.appendChild(contListaYTotal);

    // Total
    let total = document.createElement('h3');
    total.className = "total-monto";
    total.innerText = "Q. 00.00";
    contListaYTotal.appendChild(total);

    // Subtítulo
    let subTitulo = document.createElement('h3');
    subTitulo.className = "subtitulo-compras";
    subTitulo.innerText = "Lista de Compras";
    contListaYTotal.appendChild(subTitulo);

    // Contenedor de inputs (NO se descarga)
    let contEditable = document.createElement('div');
    contEditable.className = "contenedor-editables";

    let nombreEditable = document.createElement('div');
    nombreEditable.className = "editable-nombre";
    nombreEditable.setAttribute("contentEditable", "");
    aplicarPlaceholder(nombreEditable, "Producto/Servicio");
    contEditable.appendChild(nombreEditable);

    let precioEditable = document.createElement('div');
    precioEditable.className = "editable-precio";
    precioEditable.setAttribute("contentEditable", "");
    aplicarPlaceholder(precioEditable, "Precio/cantidad");
    contEditable.appendChild(precioEditable);

    // Botón Agregar
    let botonAgregar = document.createElement('button');
    botonAgregar.className = "btn-agregar";
    botonAgregar.innerText = "Agregar";
    contEditable.appendChild(botonAgregar);

    // Botón Limpiar Lista
    let botonLimpiar = document.createElement('button');
    botonLimpiar.className = "btn-limpiar";
    botonLimpiar.innerText = "Borrar";
    contEditable.appendChild(botonLimpiar);

    contenedor.appendChild(contEditable);

    // Contenedor de lista de productos (sí se descarga)
    let contListaProductos = document.createElement('div');
    contListaProductos.className = "lista-productos";
    contListaYTotal.appendChild(contListaProductos);

    // Función para renderizar la lista y total
    function renderizarLista() {
        let carritoLocalStorage = obtenerProductos();
        contListaProductos.innerHTML = "";
        let suma = 0;

        carritoLocalStorage.forEach((p) => {
            let item = document.createElement('div');
            item.className = "item-producto";
            item.innerText = `${p.nombre} - Q. ${p.precio.toFixed(2)}`;
            contListaProductos.appendChild(item);
            suma += parseFloat(p.precio) || 0;
        });

        total.innerText = `Q. ${suma.toFixed(2)}`;
    }

    // ✅ Renderizar al cargar la sección
    renderizarLista();

    // Evento botón Agregar
    botonAgregar.addEventListener('click', () => {
        let nombre = nombreEditable.innerText;
        let precio = parseFloat(precioEditable.innerText) || 0;

        // Evitar agregar los placeholders como productos
        if (nombre === "Producto/Servicio" || nombre.trim() === "" ||
            precioEditable.innerText === "Precio/cantidad" || precio <= 0) {
            return;
        }

        // Guardar en localStorage
        let carritoLocalStorage = obtenerProductos();
        carritoLocalStorage.push({ nombre, precio });
        guardarProductos(carritoLocalStorage);

        // Renderizar lista actualizada
        renderizarLista();

        // Limpiar los inputs
        nombreEditable.innerText = "Producto/Servicio";
        precioEditable.innerText = "Precio/cantidad";
    });

    // Evento botón Limpiar
    botonLimpiar.addEventListener('click', () => {
        guardarProductos([]); // limpiar localStorage
        contListaProductos.innerHTML = ""; // limpiar visualmente
        total.innerText = "Q. 00.00"; // reiniciar total
        nombreEditable.innerText = "Producto/Servicio"; // restaurar placeholder
        precioEditable.innerText = "Precio/cantidad"; // restaurar placeholder
    });

    // Evento descarga
    img.addEventListener("click", () => {
        descargar("soloLista");
    });

    return contenedor;
}

export { seccion2 };
