import { Box, CardActionArea, Drawer, Grid, IconButton, Menu, MenuItem, Select, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { BasicCard } from "components/cards/BasicCard";
import SmallPanel from "components/SmallPanel";
import { selectAuthUser } from "features/authSlice";
import { fetchConversations, selectConversations, subscribeToMessaging } from "features/conversationSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileSmallWithName } from "../ProfileSmallWithName";
import SendIcon from '@mui/icons-material/Send';

const drawerWidth = 240;

const ConversationMessaging = () => {

    const dispatch = useDispatch()
    const conversations = useSelector(selectConversations);
    const authUser = useSelector(selectAuthUser);
    const [ mobileOpen, setMobileOpen ] = useState(false)
    const [ selectedConvo, setSelectedConvo ] = useState('');
    const typeEl = useRef(null)
    const { mixins: { toolbar } } = useTheme()

    useEffect(() => {
        dispatch(fetchConversations())
    }, [dispatch])

    const conversationList = (
        conversations.length > 0 && (
            conversations.map( (conversation, index) => {
                let user = conversation.participants.filter((participant) => participant.id !== authUser.id)[0]
                return (
                    <MenuItem selected={selectedConvo === conversation.id} onClick={() => setSelectedConvo(conversation.id)}>
                        <ProfileSmallWithName sx={{ margin: '10px' }} avatar={user.displayPicture} key={index} name={user.displayName}/>
                    </MenuItem>
                )
        }))
    )

    return (
        <Box display={'flex'}>
            <Box sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {conversationList}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    {conversationList}
                </Drawer>
            </Box>
            <Box height={`calc(100vh - (${toolbar?.minHeight}px + ${8}px + ${typeEl.current?.clientHeight}px ))`}
                sx={{ backgroundColor: 'red', flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
                <Box sx={{ backgroundColor: 'blue', height: '100%' }}>

                </Box>
                <Stack direction = {'row'} spacing = {2} ref={typeEl}>
                    <Stack flexGrow={1}>
                        <TextField 
                            id="outlined-basic" 
                            label="Send Message" 
                            variant="outlined"
                            placeholder = "Type the meassage "
                            fullWidth 
                        />
                    </Stack>
                    <Stack  justifyContent = {"center"}>
                        <IconButton size = 'large' variant = 'contained' fullWidth sx={{ height: '100%', width: '100%' }}><SendIcon color = 'success' fontSize='large'/></IconButton>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default ConversationMessaging;
