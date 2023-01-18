import { Box, Paper } from "@mui/material"

export const BasicCard = ({ children }) => {

    return (
        <Paper  elevation={3} sx={{
            borderStyle: 'solid',
            borderWidth: 2,
            borderRadius: (theme) => theme.shape.borderRadius / 500,
            borderColor: (theme) => theme.palette.grey[300],
        }}>
            <Box sx={{ p: (theme) => theme.spacing(4) }}>
                {children}
            </Box>
        </Paper>
    )
}