import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
//import Routes from 'routes';

// third party
import { BrowserRouter ,Routes, Route,Navigate } from 'react-router-dom';
// defaultTheme
import themes from 'themes';
import { lazy } from 'react';

// project imports
import AdminLayout from './layout/AdminLayout';
import Loadable from 'ui-component/Loadable';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PageNotFound from './components/PageNotFound';


const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const UserList = Loadable(lazy(() => import('views/pages/UserList')));
const WhitelistedUsers = Loadable(lazy(() => import('views/pages/WhitelistedUsers')));
const KycList = Loadable(lazy(() => import('views/pages/KycList')));


const ROLES = {
    'User': 'user',
    'Admin': 'admin'
  }
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <BrowserRouter>
                    {/* <Routes /> */}
                    <Routes>
                        {/* <Route path="login" element={<AuthLogin3 />} /> */}
                        {/* <Route path="register" element={<AuthRegister3 />} /> */}
                        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
                        {/* <Route path="404" element={<PageNotFound />}  /> */}

                        <Route  path="/" element={<AdminLayout />}>
                            {/* public routes */}
                           
                            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                            <Route path="/" element={<DashboardDefault />} />
                            </Route>
                          {/*   <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                            <Route path="admin/dashboard" element={<DashboardDefault />} />
                            </Route> */}

                            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="user-list" element={<UserList />} />
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="whitelisted-user-list" element={<WhitelistedUsers />} />
                            </Route>
                            {/* catch all */}
                            <Route path="*" element={<Navigate to="404" />} />
                        </Route>
                        </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;