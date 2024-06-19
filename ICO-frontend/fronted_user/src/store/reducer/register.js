import * as types from '../contants/action-types';

const intialState = {
    user: {},
    loading: false,
    registerProgress: false
};

const Register = (state = intialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
            return {
                ...state,
                loading: true,
            };
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case types.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case types.REGISTER_PROGRESS:
            return {
                ...state,
                registerProgress: action.payload
            };



        default:
            return state;
    }
}

export default Register;