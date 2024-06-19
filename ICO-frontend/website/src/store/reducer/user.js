
const initialState = {
 
}
const reducerData =  (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_USER_DETAIL':
            return { ...state, userDetail: action.payload }
        case 'GET_FULL_NAME':
            console.log("GET_FULL_NAME",state)
            return { ...state, data: action.payload }
        default:
            return state
    }
}
export default reducerData;
 