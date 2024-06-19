
const initialState = {
    list: [],
    totalUsers:[]

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_LIST':
            return { ...state, list: action.payload }
        case 'GET_WHITE_LIST_USER_LIST':
                return { ...state, list: action.payload }
        case 'GET_LATEST_USER_LIST':
                    return { ...state, list: action.payload }
        case 'GET_DASHBOARD_DETAILS':
                    return { ...state, dashboardDetails: action.payload }
        default:
            return state
    }
}