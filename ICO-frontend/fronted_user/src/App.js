import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {  Routes, Route,Navigate } from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Login from "./components/Login"
import Forgot from "./components/Forgot"
import PasswordReset from "./components/PasswordReset"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Kyc from "./components/Kyc"
import SignUp from "./components/Signup"
import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./components/PageNotFound";
import Unauthorized from "./components/Unauthorized";
import Transaction from "./components/Transaction"

const App = () => {
  
  return (
    
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/password/reset" element={<Forgot />} />
        <Route path="/password/reset/:email/:token" element={<PasswordReset />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="404" element={<PageNotFound />}  />
        <Route exact path="/" element={<MainLayout />}>                               
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/kyc" element={<Kyc />} />
            <Route path="/profile" element={<Profile  />} />
            <Route path="/transaction" element={<Transaction  />} />
          </Route>
          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </div>
     
  )
}

export default App