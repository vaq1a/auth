export const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'LOGIN':
            return {
                auth: true,
                error: null,
                id: payload.id,
                login: payload.login,
                password: payload.password,
            }
        case 'SIGN_OUT':
            return {
                auth: false,
                error: null,
                id: null,
                login: null,
                password: null,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: payload.message
            }
        default:
            return state;
    }
}