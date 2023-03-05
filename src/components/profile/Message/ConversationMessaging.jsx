import { Avatar, Box, Button, Divider, Drawer, IconButton, MenuItem, Modal, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { selectAuthUser } from "features/authSlice";
import { fetchConversationMessages, fetchConversations, sendNewMessage, selectConversations, selectMessages, sendTyping, selectTyping, stopTyping, isTyping } from "features/conversationSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileSmallWithName } from "../ProfileSmallWithName";
import SendIcon from '@mui/icons-material/Send';
import { ChatBubble } from "./ChatBubble";
import AddIcon from '@mui/icons-material/Add';
import { NewChat } from "./NewChat";
import { Groups3 } from "@mui/icons-material";
import { debounce } from "lodash";

const drawerWidth = 300;

const ConversationMessaging = () => {

    const typeEl = useRef(null)
    const { mixins: { toolbar } } = useTheme()
    const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser);
    const [ mobileOpen, setMobileOpen ] = useState(false)

    const conversations = useSelector(selectConversations);
    const [ selectedConvo, setSelectedConvo ] = useState(null);
    const [ message, setMessage ] = useState('')
    const [ newChatOpen, setNewChatOpen ] = useState(false);

    const messages = useSelector((state) => selectMessages(state, selectedConvo))
    const typing = useSelector((state) => selectTyping(state, selectedConvo))

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
        dispatch(sendNewMessage({ conversationId: selectedConvo, content: message }))
        setMessage('')
    }

    const onTyping = (e) => {
        if (selectedConvo) {
            setMessage(e.target.value)
            dispatch(sendTyping(selectedConvo))
        }
    }

    const debouceClearTyping = useCallback(
        debounce((selectedConvo) => {
            dispatch(stopTyping(selectedConvo))
        }, [1000]), 
    []);

    useEffect(() => {
        debouceClearTyping(selectedConvo)
    }, [typing])

    const conversationList = (
        <>
        <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} m={2}>
            <Typography variant="h5">Chats</Typography>
            <Button startIcon={<AddIcon/>} onClick={() => setNewChatOpen(true)}>New</Button>
        </Stack>
        <Divider/>
        { conversations.length > 0 ? (
            conversations.map( (conversation, index) => {
                let user = conversation.participants.filter((participant) => participant.id !== authUser.id)[0]

                let picture;
                if (conversation.picture)
                    picture = conversation.picture
                else if (conversation.participants.length === 2)
                    picture = user?.displayPicture

                let name;
                if (conversation.name)
                    name = conversation.name
                else
                    name = user?.displayName
                
                return (
                    <MenuItem key={index} selected={selectedConvo === conversation.id} onClick={() => onConversationSelect(conversation.id)}>
                        {/* <ProfileSmallWithName dpSize={30} sx={{ margin: 1 }} avatar={user?.displayPicture} name={ conversation.name ? conversation.name : user?.displayName}/> */}
                        <Stack direction={"row"} spacing={1.5} alignItems="center">
                            <Avatar alt={name} src={picture}/>
                            <Typography>{name}</Typography>
                        </Stack>
                    </MenuItem>
                )
        })) : (
            <Stack direction={"column"} spacing={2} pt={3} px={4} sx={{ color: 'grey.600' }} alignItems="center">
                <Typography align={"center"} fontSize={15}>Hey there! Want to connect with your colleagues?<br/>Start a chat now and stay in touch with your team!</Typography>
                <Box>
                    <Button variant="contained" onClick={() => setNewChatOpen(true)}>Start a Chat</Button>
                </Box>
            </Stack>
        )
        }
        </>
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
            <Modal
                open={newChatOpen}
                onClose={() => setNewChatOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <NewChat onClose={() => setNewChatOpen(false)}/>
            </Modal>
            <Box height={`calc(100vh - (${toolbar?.minHeight}px + ${8}px + ${typeEl.current?.clientHeight}px ))`}
                sx={{ 
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    paddingX: 2,
                }}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }}>
                    { typing && typing + " is typing.." }
                    {
                        messages?.map((message, index) => { 
                            let topSent = messages[index+1]?.senderId === message.senderId ? true : false;
                            let bottomSent = messages[index-1]?.senderId === message.senderId ? true : false;
                            let sent = message.senderId === authUser.id
                            return (
                                <ChatBubble topSent={topSent} bottomSent={bottomSent} key={index} sent={sent} content={message.content}/>
                            )
                        })
                    }
                </Box>
                <Stack direction = {'row'} spacing={2} ref={typeEl} py={1}>
                    <Stack flexGrow={1}>
                        <TextField 
                            value={message}
                            onChange={onTyping}
                            label="Send Message" 
                            variant="outlined"
                            placeholder = "Type the meassage "
                            fullWidth 
                        />
                    </Stack>
                    <Stack justifyContent={"center"}>
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
