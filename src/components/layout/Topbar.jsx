import { ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined, RssFeed } from "@mui/icons-material"
import CircleIcon from '@mui/icons-material/Circle';
import { AppBar, Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { height } from "@mui/system";
import { AvatarWithInitials } from "components/AvatarWithInitials";
import { fetchNotifications, selectNotifications, selectNotificationsLoading, timeDifference } from "features/notificationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, requestUserProfile, selectAuthUser } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";
import { RouterLink } from "../RouterLink";

export const Topbar = () => {

    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const notifications = useSelector(selectNotifications)
    const notificationsLoading = useSelector(selectNotificationsLoading);

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
                            <Badge badgeContent={notifications.filter((val) => val.status === "UNREAD").length} color="error">
                                <NotificationsNoneOutlined/>
                            </Badge>
                        </IconButton>
                        <Menu
                            open={Boolean(notificationAnchorEl)}
                            anchorEl={notificationAnchorEl}
                            onClose={() => { setNotificationAnchorEl(null) }}
                            // anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                            PaperProps={{
                                style: {
                                    maxHeight: 72 * 4.5,
                                    width: '42ch'
                                }
                            }}
                        >
                            {   
                                notifications.map((notification, index) => (
                                    <MenuItem key={index}>
                                        <Stack direction={"row"} justifyContent="space-between" width="100%" alignItems="center" key={index}>
                                            <Stack direction={"column"} width={ notification.status === "UNREAD" ? "90%" : "100%" }>
                                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{notification.header}</Typography>
                                                <Typography variant="subtitle1" sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}>{notification.content}</Typography>
                                            </Stack>
                                            <Stack direction={"row"} spacing={1}>
                                            { notification.status === "UNREAD" && <CircleIcon sx={{ width: 16, height: 16 }} fontSize="small" color="primary"/> }
                                            <Typography variant="caption">{ timeDifference(new Date(), new Date(notification.timestamp)) }</Typography> 
                                            </Stack>
                                        </Stack>
                                    </MenuItem>
                                ))
                            }
                            {notificationsLoading && <Typography>Loading</Typography>}
                            <MenuItem onClick={ () => dispatch(fetchNotifications(2)) }>
                                <Typography variant="subtitle2">Load More</Typography> 
                            </MenuItem>
                        </Menu>
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