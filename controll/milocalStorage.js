const CARRITO = 'carrito';

function obtenerProductos() {
    return JSON.parse(localStorage.getItem(CARRITO)) || [];
}

function guardarProductos(lista) {
    localStorage.setItem(CARRITO, JSON.stringify(lista));
}

function agregarProducto(nombre, precio) {
    let productos = obtenerProductos();
    productos.push({ nombre, precio });
    guardarProductos(productos);
}

export { obtenerProductos, guardarProductos, agregarProducto };