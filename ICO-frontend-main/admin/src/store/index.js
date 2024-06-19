import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
// ==============================|| REDUX - MAIN STORE ||============================== //

 

export default function configureStore() {
    return createStore(
        reducer,
        applyMiddleware(thunk)
    );
}