import { SHOW_LOADER } from "../contants/action-types"

const initialState = {
    patientActiveTab: "Profile",
    isLoader:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, isLoader: action.payload }
        default:
            return state
    }
}