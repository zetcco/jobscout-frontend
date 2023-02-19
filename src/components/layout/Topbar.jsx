import { ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined, RssFeed } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Button, IconButton, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { AvatarWithInitials } from "components/AvatarWithInitials";
import { selectNotifications } from "features/notificationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, requestUserProfile, selectAuthUser } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";
import { RouterLink } from "../RouterLink";

export const Topbar = () => {

    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const notifications = useSelector(selectNotifications)

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(requestUserProfile())
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
                            <Badge badgeContent={notifications.filter((val) => val.status === "UNREAD").length} color="error">
                                <NotificationsNoneOutlined/>
                            </Badge>
                        </IconButton>
                        <Popover open={Boolean(notificationAnchorEl)} anchorEl={notificationAnchorEl} onClose={() => { setNotificationAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                            <BasicCard>
                                <Stack direction={"column"} spacing={2}>                           
                                    {
                                        notifications.map((notification, index) => (
                                            <Stack direction={"row"} key={index}>
                                                <Stack direction={"column"}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{notification.header}</Typography>
                                                    <Typography variant="subtitle1">{notification.content}</Typography>
                                                </Stack>
                                                <Box sx={{ backgroundColor: "primary.main", height: "10px", widht: "10px" }}></Box>
                                            </Stack>
                                        ))
                                    }
                                </Stack>
                            </BasicCard>
                        </Popover>
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