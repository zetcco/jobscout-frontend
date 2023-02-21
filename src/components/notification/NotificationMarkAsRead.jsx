import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';

export const NotificationMarkAsRead = () => {
    const [ markAsReadHover, setMarkAsReadHover ] = useState(false);

    return (
        <IconButton onMouseEnter={() => setMarkAsReadHover(true)} onMouseLeave={() => setMarkAsReadHover(false)}>
            { markAsReadHover ? (
                <CheckCircleOutlineIcon sx={{ width: 16, height: 16 }} fontSize="small" color="primary"/> 
            ) : (
                <CircleIcon sx={{ width: 16, height: 16 }} fontSize="small" color="primary"/> 
            ) }
        </IconButton>
    )
}
