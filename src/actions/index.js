export const getTrabajadores = (payload) => ({
    type: 'GET_TRABAJADORES',
    payload,
});

export const resetTrabajadores = () => ({
    type: 'RESET_TRABAJADORES',
});

export const deleteTrabajadores = (payload) => ({
    type: 'DELETE_TRABAJADORES',
    payload,
});

export const activateTrabajador = (payload) => ({
    type: 'ACTIVATE_TRABAJADOR',
    payload,
});