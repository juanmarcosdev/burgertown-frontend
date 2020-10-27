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