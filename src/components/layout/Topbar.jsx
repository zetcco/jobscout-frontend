import { AccountCircle, ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material"
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material"

export const Topbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1, color: (theme) => theme.palette.common.white }}> JobScout </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: '12', md: 'flex' } }}>
                        <IconButton size='large' color='inherit'>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <IconButton size='large' color='inherit'>
                            <DashboardCustomizeOutlined />
                        </IconButton>
                        <IconButton size='large' color='inherit'>
                            <NotificationsNoneOutlined/>
                        </IconButton>
                        <IconButton edge='end' aria-haspopup='true' color='inherit' >
                        <Stack direction='row' spacing={0.5}>
                            <AccountCircle size='large'/>
                            <Typography>Thanis</Typography>
                            <KeyboardArrowDownOutlined size='small'/>
                        </Stack>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}