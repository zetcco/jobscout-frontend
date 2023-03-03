import { Box, Drawer, IconButton, MenuItem, Stack, TextField, Toolbar, useTheme } from "@mui/material";
import { selectAuthUser } from "features/authSlice";
import { fetchConversationMessages, fetchConversations, newMessage, selectConversations, selectMessages } from "features/conversationSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileSmallWithName } from "../ProfileSmallWithName";
import SendIcon from '@mui/icons-material/Send';
import { ChatBubble } from "./ChatBubble";

const drawerWidth = 240;

const ConversationMessaging = () => {

    const typeEl = useRef(null)
    const { mixins: { toolbar } } = useTheme()
    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const [ mobileOpen, setMobileOpen ] = useState(false)

    const conversations = useSelector(selectConversations);
    const [ selectedConvo, setSelectedConvo ] = useState(null);
    const [ message, setMessage ] = useState('')

    const messages = useSelector((state) => selectMessages(state, selectedConvo))

    useEffect(() => {
        dispatch(fetchConversations())
    }, [dispatch])

    useEffect(() => {
        if (!selectedConvo && conversations[0]) {
            setSelectedConvo(conversations[0]?.id) 
            dispatch(fetchConversationMessages(conversations[0]?.id))
        }
    }, [conversations])

    const onConversationSelect = (id) => {
        setSelectedConvo(id)
        if (id && conversations.find( (conversation) => conversation.id === id ).messages === null) 
            dispatch(fetchConversationMessages(id))
    }

    const sendMessage = () => {
        // dispatch(newMessage({ conversationId: selectedConvo, content: message }))
    }

    const conversationList = (
        conversations.length > 0 && (
            conversations.map( (conversation, index) => {
                let user = conversation.participants.filter((participant) => participant.id !== authUser.id)[0]
                return (
                    <MenuItem key={index} selected={selectedConvo === conversation.id} onClick={() => onConversationSelect(conversation.id)}>
                        <ProfileSmallWithName sx={{ margin: '10px' }} avatar={user.displayPicture} name={user.displayName}/>
                    </MenuItem>
                )
        }))
    )

    return (
        <>
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
                    <Toolbar/>
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
                    <Toolbar/>
                    {conversationList}
                </Drawer>
            </Box>
            <Box height={`calc(100vh - (${toolbar?.minHeight}px + ${8}px + ${typeEl.current?.clientHeight}px ))`}
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }}>
                    {
                        messages?.map((message, index) => (
                            <ChatBubble key={index} sent={message.sender.id === authUser.id} content={message.content}/>
                        ))
                    }
                    {/* <ChatBubble sent={true} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/>
                    <ChatBubble sent={false} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/>
                    <ChatBubble sent={true} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/>
                    <ChatBubble sent={false} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/>
                    <ChatBubble sent={false} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/>
                    <ChatBubble sent={true} content={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}/> */}
                </Box>
                <Stack direction = {'row'} spacing = {2} ref={typeEl}>
                    <Stack flexGrow={1}>
                        <TextField 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            label="Send Message" 
                            variant="outlined"
                            placeholder = "Type the meassage "
                            fullWidth 
                        />
                    </Stack>
                    <Stack  justifyContent = {"center"}>
                        <IconButton size = 'large' variant = 'contained' onClick={sendMessage}>
                            <SendIcon color = 'success' fontSize='large'/>
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </Box>
        </>
    );
};

export default ConversationMessaging;
