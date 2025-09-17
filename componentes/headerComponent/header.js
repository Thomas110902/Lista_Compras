function crearHeader() {
    
    // Crear el header
    let header1 = document.createElement('div');
    header1.className = "div-header";
    header1.innerText = "Lista de Compras ";
    

    return header1;
}



export {
    crearHeader
}