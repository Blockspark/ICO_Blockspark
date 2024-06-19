import { combineReducers } from 'redux';
import Login from "./login";
import common from './common';
import customizationReducer from './customizationReducer';
import Register from "./register";
export default combineReducers({
    Login,
    common,
    customizationReducer,
    Register
});