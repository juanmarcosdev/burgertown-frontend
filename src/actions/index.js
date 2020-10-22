export const getTrabajadores = (payload) => ({
    type: 'GET_TRABAJADORES',
    payload,
});

export const resetTrabajadores = () => ({
    type: 'RESET_TRABAJADORES',
});