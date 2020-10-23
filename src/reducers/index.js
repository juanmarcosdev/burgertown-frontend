const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: action.payload,
            };
        case 'RESET_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: [],
            };
        case 'DELETE_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: state.dataTrabajadores.filter((items) => items.trabajador_id !== action.payload),
            };
        case 'ACTIVATE_TRABAJADOR':
            return {
                ...state,
                dataTrabajadores: [...state.dataTrabajadores, action.payload]
            };
        default:
            return state;
    }
};

export default reducer;