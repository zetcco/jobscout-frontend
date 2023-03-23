import { Box, Paper } from "@mui/material"

export const BasicCard = ({ children, sx, onClick, fullHeight, padding, noElevation, inner_sx }) => {

    return (
        <Paper sx={{
            ...(   !noElevation && 
                ({
                    boxShadow: '0px 5px 14px 2px rgba(0,0,0,0.13)',
                    borderRadius: (theme) => theme.shape.borderRadius / 500
                })
            ),
            ...( fullHeight && ({height: '100vh'}) ),
            ...sx
        }}
        onClick={onClick ? onClick : undefined}
        elevation={noElevation ? 0 : undefined}
        >
            <Box sx={{ 
                p: ( padding ? padding : { xs: 2, sm: 4 }),
                ...( fullHeight && ({height: '100%'})),
                ...inner_sx,
                }}>
                {children}
            </Box>
        </Paper>
    )
}