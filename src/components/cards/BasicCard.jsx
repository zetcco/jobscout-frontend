import { Close } from "@mui/icons-material"
import { Box, IconButton, Paper } from "@mui/material"
import { forwardRef } from "react"

export const BasicCard = forwardRef(({ children, sx, divsx, onClick, fullHeight, padding, noElevation, inner_sx, error, onClose, onMouseEnter, onMouseLeave, glassEffect }, ref ) => {

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ ...divsx }}>
        <Paper sx={{
            ...(   !noElevation && 
                ({
                    boxShadow: 25,
                    borderRadius: (theme) => theme.shape.borderRadius / 500
                })
            ),
            ...(error && (
                {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: (theme) => theme.palette.error.main,
                }
            )),
            ...( fullHeight && ({height: '100vh'}) ),
            ...( glassEffect && (
                {
                    background: 'rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }
            )),
            ...sx
        }}
        onClick={onClick ? onClick : undefined}
        elevation={noElevation ? 0 : undefined}
        >
            <Box ref={ref} sx={{ 
                p: ( padding ? padding : { xs: 2, sm: 4 }),
                ...( fullHeight && ({height: '100%'})),
                ...inner_sx,
                position: 'relative'
                }}>
                { onClose && (
                    <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                    <IconButton onClick={onClose}><Close fontSize="small"/></IconButton>
                    </Box>
                )}
                {children}
            </Box>
        </Paper>
        </div>
    )
})

BasicCard.defaultProps = {
    glassEffect: true
}