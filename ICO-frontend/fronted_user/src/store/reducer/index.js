import { combineReducers } from 'redux';
import Login from "./login";
import Register from "./register";
import User from "./user";
 


const reducer = combineReducers({
    Login,
    User,
    Register
});

export default reducer;
