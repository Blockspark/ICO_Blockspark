import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import Login from "./reducer/login";
import common from './reducer/common';
import Register from "./reducer/register";
import Admin from "./reducer/admin";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    Login,
    common,
    Register,
    Admin
});

export default reducer;
