import { AppBar, Box, Toolbar, Typography } from "@mui/material"

export const Topbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> JobScout </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}