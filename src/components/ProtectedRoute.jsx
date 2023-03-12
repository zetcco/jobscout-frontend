import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthUser } from '../features/authSlice';
import { connectToWebSocket, selectWebSocketConnected  } from "features/websocketSlice";
import { subscribeToNotification } from 'features/notificationSlice';
import { subsribeToServerPrivateMessage } from 'features/conversationSlice';

export const ProtectedRoute = ({ role, redirect }) => {

    const authUser = useSelector(selectAuthUser);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(connectToWebSocket)
    }, [dispatch])

    if (!authUser)
        return ( <Navigate to={"/login"} replace/> )
    
    if (role && authUser.role !== role)
        return ( <Navigate to={redirect} replace/> )
    
    return <Outlet/>
}
