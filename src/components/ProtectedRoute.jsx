import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthUser } from '../features/authSlice';

export const ProtectedRoute = ({ role, redirect, children }) => {

    const authUser = useSelector(selectAuthUser);

    if (!authUser)
        return ( <Navigate to={"/login"} replace/> )
    
    if (role && authUser.role != role)
        return ( <Navigate to={redirect} replace/> )
    
    return children ? children : <Outlet/>
}
