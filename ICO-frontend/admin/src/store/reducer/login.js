import * as types from '../contants/action-types';

const intialState = {
    user: {},
    loading: false,
    loginProgress: false
};

const Login = (state = intialState, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                ...state,
                loading: true,
            };
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case types.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case types.LOGIN_PROGRESS:
            return {
                ...state,
                loginProgress: action.payload
            };



        default:
            return state;
    }
}

export default Login;