import React, { useContext, useEffect, Suspense } from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import AuthRoutes from "./routes/AuthRoutes";
import { authProtectedRoutes, publicRoutes } from "./routes";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Loader from "./ui-component/Loader";
import Layout from "./layout/AdminLayout/index";
import UserLayout from "./layout/UserLayout/index";
import PublicRoutes from "./routes/PublicRoutes";
import {  RoleContext, TokenContext } from "./StateProvider";
import themes from 'themes';
 
const NotFound = React.lazy(() => import("./components/Common/PageNotFound"));


// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const currentLocation = window.location.pathname,
    { role } = useContext(RoleContext),
    { token } = useContext(TokenContext),
    layout = role == "user" ? UserLayout : Layout;
   // layout = Layout;
      
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <React.Fragment>
                  <Suspense fallback={<Loader />}>
                  <BrowserRouter>
                    <Routes>
                      {token
                          ? authProtectedRoutes.map(
                            (route, idx) =>
                              (role == route?.defaultRole ||
                                route?.defaultRole == "common") && (
                              <AuthRoutes
                                  path={route.path}
                                  layout={layout}
                                  component={route.component}
                                  key={idx}
                                  isAuthProtected={true}
                                  exact
                                  role={role}
                                  apiRole={route?.apiRole}
                                  defaultRole={route?.defaultRole}
                                />  
                              )
                          ) : publicRoutes.map((route, key) => (
                            <PublicRoutes
                              path={route.path}
                              component={route.component}
                              key={key}
                              exact
                              role={role}
                              defaultRole={route?.defaultRole}
                            />
                          ))}
                        <Route
                        path='*'
                        
                          element={<NotFound  default
                            authenticated={
                              currentLocation == "/" ||
                              currentLocation === "/client" ||
                              currentLocation === "/client/"
                            }
                            token={token} />}
                        />
                    </Routes>
                    </BrowserRouter>
                  </Suspense>
                </React.Fragment>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
