import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css"
 

import Header from "./components/Header";
import Main from "./components/Main";
 

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  )
}

export default App