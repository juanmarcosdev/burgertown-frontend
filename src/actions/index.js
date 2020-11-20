export const getTrabajadores = (payload) => ({
    type: 'GET_TRABAJADORES',
    payload,
});

export const deleteTrabajadores = (payload) => ({
    type: 'DELETE_TRABAJADORES',
    payload,
});

export const activateTrabajador = (payload) => ({
    type: 'ACTIVATE_TRABAJADOR',
    payload,
});

// Clientes

export const getClientes = (payload) => ({
    type: 'GET_CLIENTES',
    payload,
});

export const deleteClientes = (payload) => ({
    type: 'DELETE_CLIENTES',
    payload,
});

export const activateCliente = (payload) => ({
    type: 'ACTIVATE_CLIENTE',
    payload,
});

// Categorias

export const getCategorias = (payload) => ({
    type: 'GET_CATEGORIAS',
    payload,
});

export const deleteCategorias = (payload) => ({
    type: 'DELETE_CATEGORIAS',
    payload,
});

export const activateCategoria = (payload) => ({
    type: 'ACTIVATE_CATEGORIA',
    payload,
});

// Sedes

export const getSedes = (payload) => ({
    type: 'GET_SEDES',
    payload,
});

export const deleteSedes = (payload) => ({
    type: 'DELETE_SEDES',
    payload,
});

export const activateSede = (payload) => ({
    type: 'ACTIVATE_SEDE',
    payload,
});

// Sedes

export const getProductos = (payload) => ({
    type: 'GET_PRODUCTOS',
    payload,
});

export const deleteProductos = (payload) => ({
    type: 'DELETE_PRODUCTOS',
    payload,
});

export const activateProducto = (payload) => ({
    type: 'ACTIVATE_PRODUCTO',
    payload,
});

// Menu

export const getMenu = (payload) => ({
    type: 'GET_MENU',
    payload,
});

export const getMenuProductos = (payload) => ({
    type: 'GET_MENU_PRODUCTOS',
    payload,
});

export const getProductoIndividual = (payload) => ({
    type: 'GET_PRODUCTO_INDIVIDUAL',
    payload,
});

export const sendCarritoProducto = (payload) => ({
    type: 'SEND_CARRITO_PRODUCTO',
    payload,
});