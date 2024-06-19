
const initialState = {
 
}
const reducerData =  (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_USER_DETAIL':
            return { ...state, userDetail: action.payload }
        case 'GET_FULL_NAME':
            return { ...state, data: action.payload }
            case 'GET_TRANSACTIONS_LIST':
            return { ...state, list: action.payload }
        default:
            return state
    }
}
export default reducerData;
 