import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const token = localStorage.getItem("token");
	//role = localStorage.getItem("role");
    const location = useLocation();
    return (
                token? <Outlet /> : token ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/sign-in" state={{ from: location }} replace />  
    );
}

export default RequireAuth;