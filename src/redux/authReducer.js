const FETCH_AUTH = "FETCH_AUTH"

let initialState = {
    isAuth: false
}
export function authReducer(state = initialState, action ) { // action = { type: "FETCH_AUTH", payload: true}
    switch (action.type) {
        case FETCH_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state
    }
}


export const fetchAuth = (payload) =>{ // { type: "FETCH_AUTH", payload: true}
    return {
        type: FETCH_AUTH,
        payload,
    }
}