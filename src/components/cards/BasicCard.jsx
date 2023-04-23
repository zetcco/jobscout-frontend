import { Box, Paper } from "@mui/material"
import { forwardRef } from "react"

export const BasicCard = forwardRef(({ children, sx, onClick, fullHeight, padding, noElevation, inner_sx, error }, ref ) => {

    return (
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
            ...sx
        }}
        onClick={onClick ? onClick : undefined}
        elevation={noElevation ? 0 : undefined}
        >
            <Box ref={ref} sx={{ 
                p: ( padding ? padding : { xs: 2, sm: 4 }),
                ...( fullHeight && ({height: '100%'})),
                ...inner_sx,
                }}>
                {children}
            </Box>
        </Paper>
    )
})