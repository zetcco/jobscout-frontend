import { ChatBubbleOutlineOutlined, DashboardCustomizeOutlined, NotificationsNoneOutlined, KeyboardArrowDownOutlined, RssFeed, Home } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Button, IconButton, Modal, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { fetchNotifications, selectUnreadNotificationCount } from "features/notificationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, requestUserProfile, resetSuccess, selectAuthSuccess, selectAuthUser } from '../../features/authSlice'
import { BasicCard } from "../cards/BasicCard";
import { RouterLink } from "../RouterLink";
import { NotificationPanel } from "components/notification/NotificationPanel";
import { GenerateCV } from "components/profile/GenerateCV";
import { fetchConversationsIndexed, selectUnreadConversationCount } from "features/indexedConversationSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const Topbar = () => {

    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const authSuccess = useSelector(selectAuthSuccess)
    const unreadNotificationCount = useSelector(selectUnreadNotificationCount);
    const unreadMessageCount = useSelector(selectUnreadConversationCount)

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    const [ generateCVOpen, setGenerateCVOpen ] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    let rel_location = location.pathname.split("/").at(-1)

    useEffect(() => {
        if (authSuccess) dispatch(resetSuccess())
    }, [authSuccess])

    useEffect(() => {
        dispatch(requestUserProfile())
        dispatch(fetchNotifications(2))
        dispatch(fetchConversationsIndexed())
    }, [dispatch])

    const selectedStyles = {
        borderBottom: '3px solid',
        borderColor: 'primary.main',
        color: 'primary.main',
        backgroundColor: 'primary.fader'
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            elevation={0}
            >
                {/* <Toolbar sx={{ color: (theme) => theme.palette.common.white, boxShadow: (theme) => theme.shadows[25] }}> */}
                <Toolbar variant="dense" sx={{ 
                    color: (theme) => theme.palette.common.black,
                    boxShadow: (theme) => theme.shadows[25],
                    height: 64
                }}>
                    <RouterLink to={"/home"}><Typography variant="h5" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}> JobScout </Typography></RouterLink>
                    <RouterLink to={"/home"}><Typography variant="h5" sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>Js</Typography></RouterLink>
                    <Box sx={{ flexGrow: 1, height: '100%' }}>
                        <Stack justifyContent={{ xs: 'right', sm: 'center' }} sx={{ height: '100%' }} direction={'row'} spacing={{ xs: 0, md: 4 }}>
                            <Stack sx={{  width: { sm: 100 }, ...(rel_location === 'home' && selectedStyles) }} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                <RouterLink to={'/home'}>
                                    <IconButton size='large' color="inherit">
                                        <Home/>
                                    </IconButton>
                                </RouterLink>
                            </Stack>
                            <Stack sx={{  width: { sm: 100 }, ...(rel_location === 'blog' && selectedStyles) }} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                <RouterLink to={"/blog"}>
                                    <IconButton size='large' color='inherit'>
                                        <RssFeed />
                                    </IconButton>
                                </RouterLink>
                            </Stack>
                            <Stack sx={{  width: { sm: 100 }, ...(rel_location === 'manage' && selectedStyles) }} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                            <RouterLink to={'/home'}>
                                <IconButton size='large' color='inherit'>
                                    <DashboardCustomizeOutlined />
                                </IconButton>
                            </RouterLink>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box sx={{ display: { xs: '12', md: 'flex' } }}>
                        <RouterLink to={"/messages"}>
                            <IconButton size='large' color='inherit'>
                                <Badge badgeContent={unreadMessageCount} color="error">
                                    <ChatBubbleOutlineOutlined />
                                </Badge>
                            </IconButton>
                        </RouterLink>
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
                                <KeyboardArrowDownOutlined size='small'/>
                            </Stack>
                        </IconButton>
                        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                            <BasicCard>
                                <Stack direction={"column"} spacing={2}>                           
                                    <Button onClick={() => navigate(`/users/${authUser.id}`)}>My Profile</Button>
                                    <Button onClick={() => dispatch(logout())}>Logout</Button>
                                    { authUser.role === "ROLE_JOB_SEEKER" && (
                                        <>
                                        <Button onClick={() => setGenerateCVOpen(true)}>Generate CV</Button>
                                        <Modal
                                            open={generateCVOpen}
                                            onClose={() => setGenerateCVOpen(false)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <GenerateCV onClose={() => setGenerateCVOpen(false)}/>
                                        </Modal>
                                        <Button onClick={() => navigate('/questionaries')}>Questionaries</Button>
                                        </>
                                    ) }
                                </Stack>
                            </BasicCard>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}