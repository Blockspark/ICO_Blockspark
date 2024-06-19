import React, { useContext, useEffect, Suspense } from "react";
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import {  RoleContext, TokenContext } from "../StateProvider";
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { token } = useContext(TokenContext);
    let routeArray = [];
    if(!token){
        routeArray = [AuthenticationRoutes];
    }else {
        routeArray = [MainRoutes];
    }
    return useRoutes(routeArray);
    
}