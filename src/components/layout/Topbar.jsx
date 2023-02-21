import { ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined, RssFeed } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Button, IconButton, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { fetchNotifications, selectUnreadNotificationCount } from "features/notificationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, requestUserProfile, selectAuthUser } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";
import { RouterLink } from "../RouterLink";
import { NotificationPanel } from "components/notification/NotificationPanel";

export const Topbar = () => {

    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const unreadNotificationCount = useSelector(selectUnreadNotificationCount);

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(requestUserProfile())
        dispatch(fetchNotifications(2))
    }, [dispatch])

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
                        <IconButton size='large' color='inherit' onClick={(e) => { setNotificationAnchorEl(e.target) }}>
                            <Badge badgeContent={unreadNotificationCount} color="error">
                                <NotificationsNoneOutlined/>
                            </Badge>
                        </IconButton>
                        <NotificationPanel anchorEl={notificationAnchorEl} setAnchorEl={setNotificationAnchorEl}/>
                        <IconButton edge='end' aria-haspopup='true' color='inherit' onClick={(e) => { setAnchorEl(e.target) }}>
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
                        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
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