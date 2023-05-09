import { Button, useMediaQuery } from '@mui/material'
import React from 'react'

export const ResponsiveIconButton = ({ onClick, startIcon, color, children }) => {

    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
        <Button onClick={onClick} sx={{
            minWidth: { xs: 0 },
            "& .MuiButton-startIcon": {
                margin: { xs: 0 }
            }
        }} color={color} startIcon={startIcon}><span style={{ display: isSmallScreen && 'none' }}>{children}</span></Button>
    )
}
