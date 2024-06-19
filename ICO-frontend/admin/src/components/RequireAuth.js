import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
	//role = localStorage.getItem("role");
    const location = useLocation();
    return (
         /* token?.role?.find(role => allowedRoles?.includes(role) )
            ? <Outlet />
            : token ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />  */

                token? <Outlet /> : token ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />  
    );
}

export default RequireAuth;