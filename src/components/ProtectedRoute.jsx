import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthUser } from '../features/authSlice';
import { connectToWebSocket } from "features/websocketSlice";

export const ProtectedRoute = ({ role, redirect }) => {

    const authUser = useSelector(selectAuthUser);
    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser)
            dispatch(connectToWebSocket)
    }, [dispatch, authUser])

    if (!authUser)
        return ( <Navigate to={"/login"} replace/> )
    
    if (role && authUser.role !== "ROLE_ADMIN" && authUser.role !== role)
        return ( <Navigate to={redirect} replace/> )
    
    return <Outlet/>
}
