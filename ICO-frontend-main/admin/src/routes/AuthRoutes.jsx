import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoutes = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  defaultRole,
  apiRole,
  role,
  path,
  ...rest
}) => (
   
 /*  <Route
    {...rest}
    render={(props) => defaultRole == "common" ? <Component {...props} defaultRole={apiRole} />
      : <Layout>
        <Component  {...props} {...rest} />
        
      </Layout>
    }
  /> */

   
  <Route
      {...rest}
       
      element={ <Layout />}
    >
       
  <Route
      {...rest}
      render={(props) => <Component {...props} {...rest} />}
      element={<Component />}
    />
    </Route>
 
);

export default AuthRoutes;