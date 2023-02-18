import { Avatar } from '@mui/material'
import React from 'react'

export const AvatarWithInitials = ({ src, name, size }) => {
    if (src) {
        return (
            <Avatar src={src} sx={{ width: size, height: size }}/>
        )
    } else {
        return (
            <Avatar sx={{ width: size, height: size }}>{name && (Array.from(name)[0])}</Avatar>
        )
    }
}

AvatarWithInitials.defaultProps = {
    size: 24
}