import { ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined, RssFeed } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, IconButton, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { logout, requestUserProfile, selectAuthUser, selectAuthUserToken } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";
import { RouterLink } from "../RouterLink";

var stompClient = null;

export const Topbar = () => {

    const authUser = useSelector(selectAuthUser);
    const authToken = useSelector(selectAuthUserToken);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUserProfile())
        let sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(sock);
        console.log(authToken);
        stompClient.connect({"token": authToken}, () => {
            stompClient.subscribe("/all/notify", (payload) => { console.log(payload) })
        }, (error) => {
            console.error(error);
        })
    }, [dispatch])

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
                    <RouterLink to={"/home"}><Typography variant="h5" sx={{ flexGrow: 1 }}> JobScout </Typography></RouterLink>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: '12', md: 'flex' } }}>
                        <RouterLink to={"/blog"}>
                            <IconButton size='large' color='inherit'>
                                <RssFeed />
                            </IconButton>
                        </RouterLink>
                        <RouterLink to={"/messages"}>
                            <IconButton size='large' color='inherit'>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                        </RouterLink>
                        <IconButton size='large' color='inherit'>
                            <DashboardCustomizeOutlined />
                        </IconButton>
                        <IconButton size='large' color='inherit'>
                            <NotificationsNoneOutlined/>
                        </IconButton>
                        <IconButton edge='end' aria-haspopup='true' color='inherit' onClick={handleClick}>
                            <Stack direction='row' spacing={0.5}>
                                {
                                    authUser?.displayPicture ? (
                                        <Avatar src={authUser.displayPicture} sx={{ width: 24, height: 24 }}/>
                                    ) : (
                                        <Avatar sx={{ width: 24, height: 24 }}>{ authUser?.displayName && (Array.from(authUser.displayName)[0]) }</Avatar>
                                    )
                                }
                                <Typography>{ authUser?.displayName }</Typography>
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