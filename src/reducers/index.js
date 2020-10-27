const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: action.payload,
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
        case 'GET_CLIENTES':
            return {
                ...state,
                dataClientes: action.payload,
            };
        case 'DELETE_CLIENTES':
            return {
                ...state,
                dataClientes: state.dataClientes.filter((items) => items.cliente_id !== action.payload),
            };
        case 'ACTIVATE_CLIENTE':
            return {
                ...state,
                dataClientes: [...state.dataClientes, action.payload]
            };
        case 'GET_CATEGORIAS':
            return {
                ...state,
                dataCategorias: action.payload,
            };
        case 'DELETE_CATEGORIAS':
            return {
                ...state,
                dataCategorias: state.dataCategorias.filter((items) => items.categoria_id !== action.payload),
            };
        case 'ACTIVATE_CATEGORIA':
            return {
                ...state,
                dataCategorias: [...state.dataCategorias, action.payload]
            };
        default:
            return state;
    }
};

export default reducer;