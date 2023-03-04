import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthUser } from '../features/authSlice';
import { connectToWebSocket, selectWebSocketConnected, selectWebSocketLoading } from "features/websocketSlice";
import { subscribeToNotification } from 'features/notificationSlice';
import { subsribeToServerPrivateMessage } from 'features/conversationSlice';

export const ProtectedRoute = ({ role, redirect }) => {

    const authUser = useSelector(selectAuthUser);
    const websocketConnected = useSelector(selectWebSocketConnected);
    const websocketLoading = useSelector(selectWebSocketLoading);
    const dispatch = useDispatch()

    useEffect(() => {
        if (websocketConnected) {
            dispatch(subscribeToNotification)
            dispatch(subsribeToServerPrivateMessage)
        }
    }, [dispatch, websocketConnected])

    if (!authUser)
        return ( <Navigate to={"/login"} replace/> )
    
    if (role && authUser.role !== role)
        return ( <Navigate to={redirect} replace/> )
    
    if (!websocketConnected && !websocketLoading)
        dispatch(connectToWebSocket)
    
    return <Outlet/>
}
