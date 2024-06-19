import { useRoutes } from 'react-router-dom';
import config from 'config';
import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// routes
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')));
const AdminDashboard = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const Register3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const authProtectedRoutes = [
    { path: "/user/dashboard",element : Dashboard,component: Dashboard, defaultRole: "user", exact: true },
    { path: "/admin/dashboard",element : AdminDashboard, component: AdminDashboard, defaultRole: "admin", exact: true }
];

// ==============================|| ROUTING RENDER ||============================== //
const publicRoutes = [
    { path: "/", component: AuthLogin3, exact: true },
    { path: "/register", component: Register3, exact: true }
];

export { authProtectedRoutes, publicRoutes };