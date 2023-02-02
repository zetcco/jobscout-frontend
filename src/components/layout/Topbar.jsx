import { AccountCircle, ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuthUser } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";

export const Topbar = () => {

    const authUser = useSelector(selectAuthUser)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                        <IconButton edge='end' aria-haspopup='true' color='inherit' onClick={handleClick}>
                            <Stack direction='row' spacing={0.5}>
                                <AccountCircle size='large'/>
                                <Typography>{ authUser.name }</Typography>
                                <KeyboardArrowDownOutlined size='small'/>
                            </Stack>
                        </IconButton>
                        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                            <BasicCard>
                                <Stack direction={"column"} spacing={2}>                           
                                    <Button onClick={() => dispatch(logout())}>Logout</Button>
                                </Stack>
                            </BasicCard>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}