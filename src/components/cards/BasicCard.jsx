import { Box, Paper } from "@mui/material"

export const BasicCard = ({ children, sx, onClick, fullHeight }) => {

    return (
        <Paper sx={{
            boxShadow: '0px 5px 14px 2px rgba(0,0,0,0.13)',
            // borderStyle: 'solid',
            // borderWidth: 2,
            borderRadius: (theme) => theme.shape.borderRadius / 500,
            // borderColor: (theme) => theme.palette.grey[300],
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