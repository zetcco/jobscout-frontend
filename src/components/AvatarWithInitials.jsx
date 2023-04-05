import { Avatar, Box, Popover } from '@mui/material'
import React, { useRef, useState } from 'react'

export const AvatarWithInitials = ({ src, name, size, onHover }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const hoverRef = useRef(null)

    const showPopover = () => { setAnchorEl(hoverRef.current) }

    const hidePopover = () => { setAnchorEl(null) }

    return (
        <>
        <div 
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
            ref={hoverRef}
        >
            { onHover && (
                <Popover
                    open={Boolean(anchorEl)}
                    onClose={hidePopover} 
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        pointerEvents: 'none'
                    }}
                    PaperProps={{
                        onMouseEnter: showPopover,
                        onMouseLeave: hidePopover,
                        sx: {
                            pointerEvents: 'auto'
                        }
                    }}
                >
                    {onHover}
                </Popover>
            )}
            {(src) ? (
                <Avatar src={src} sx={{ width: size, height: size }}/>
            ) : (
                <Avatar sx={{ width: size, height: size }}>{name && (Array.from(name)[0])}</Avatar>
            )}
        </div>
        </>
    )
}

AvatarWithInitials.defaultProps = {
    size: 24
}