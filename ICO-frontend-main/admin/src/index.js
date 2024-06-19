import React from "react";
import ReactDOM from 'react-dom';

// third party
//import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
 
import store from "./store";
import StateProvider from "./StateProvider";
// style + assets
import 'assets/scss/style.scss';
import "toastr/build/toastr.min.css";
// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store()}>
        <StateProvider>
          <App />
        </StateProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();