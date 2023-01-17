import { Box, Paper } from "@mui/material"

export const BasicCard = ({ children }) => {

    return (
        <Paper  elevation={3}>
            <Box sx={{ p: (theme) => theme.spacing(2) }}>
                {children}
            </Box>
        </Paper>
    )
}