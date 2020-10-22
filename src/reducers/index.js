const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: [...state.dataTrabajadores, action.payload],
            };
        case 'RESET_TRABAJADORES':
            return {
                ...state,
                dataTrabajadores: [],
            };
        default:
            return state;
    }
};

export default reducer;