import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({
  component: Component,
  isAuthProtected,
  role,
  path,
  ...rest
}) => {

 
  return (
   
  <Route
      {...rest}
      render={(props) => <Component {...props} {...rest} />}
      element={<Component />}
    />
     
  );
}

export default PublicRoutes;
