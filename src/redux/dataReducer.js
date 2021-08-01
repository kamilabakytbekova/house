import Api from "../API/Api"


const FETCH_DATA = 'dataReducer/FETCH_DATA'

export function dataReducer(state = {data: []}, action) { // {type: 'string'}
    switch (action.type) {
        case FETCH_DATA:
            return {data: action.payload}
        default:
            return state
    }
}

export const fetchDataAC = (str) => (dispatch) => {
    Api.getElements(str)
        .then((res) => {
            dispatch({
                type: FETCH_DATA,
                payload: res.data
            })
        })
}