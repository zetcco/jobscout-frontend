import { Box, Paper } from "@mui/material"

export const BasicCard = ({ children, sx, onClick, fullHeight }) => {

    return (
        <Paper  elevation={3} sx={{
            borderStyle: 'solid',
            borderWidth: 2,
            borderRadius: (theme) => theme.shape.borderRadius / 500,
            borderColor: (theme) => theme.palette.grey[300],
            ...( fullHeight && ({height: '100vh'}) ),
            ...sx
        }}
        onClick={onClick ? onClick : undefined}
        >
            <Box sx={{ 
                p: { xs: 2, sm: 4 },
                ...( fullHeight && ({height: '100%'}))
                }}>
                {children}
            </Box>
        </Paper>
    )
}