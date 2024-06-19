import React, { useContext, useEffect, Suspense } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';
import {  RoleContext, TokenContext } from "../StateProvider";
const PrivateRoute = ({ children,roles }) => {
  let location = useLocation();

  const { token } = useContext(TokenContext);
  const { user, loading } = useSelector(state => state.auth);

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  

  return children;
};

export default PrivateRoute;