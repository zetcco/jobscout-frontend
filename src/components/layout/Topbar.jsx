import { AccountCircle, ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material"
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/authSlice'

export const Topbar = () => {

    const authUser = useSelector(selectAuthUser)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Toolbar sx={{ color: (theme) => theme.palette.common.white }}>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}> JobScout </Typography>
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
                            <Typography>{ authUser.name }</Typography>
                            <KeyboardArrowDownOutlined size='small'/>
                        </Stack>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}