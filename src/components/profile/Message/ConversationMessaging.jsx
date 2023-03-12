import { Avatar, Box, Button, Divider, Drawer, IconButton, MenuItem, Modal, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { selectAuthUser } from "features/authSlice";
import { fetchConversationMessages, fetchConversations, sendSignalToConversation, selectConversations, selectMessages, selectTyping, stopTyping } from "features/conversationSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { ChatBubble } from "./ChatBubble";
import AddIcon from '@mui/icons-material/Add';
import { NewChat } from "./NewChat";
import { debounce } from "lodash";
import { Conversations } from "./Conversations";

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
    }, [conversations, dispatch])

    const onConversationSelect = (id) => {
        setSelectedConvo(id)
        if (id && conversations.find( (conversation) => conversation.id === id ).messages === null) 
            dispatch(fetchConversationMessages(id))
    }

    const sendMessage = () => {
        dispatch(sendSignalToConversation(selectedConvo, "MESSAGE", message))
        setMessage('')
    }

    const onTyping = (e) => {
        if (selectedConvo) {
            setMessage(e.target.value)
            dispatch(sendSignalToConversation(selectedConvo, "TYPING" ))
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13)
            sendMessage()
    }

    const debouceClearTyping = useCallback(
        debounce((selectedConvo) => {
            dispatch(stopTyping(selectedConvo))
        }, [1000]), 
    []);

    useEffect(() => {
        debouceClearTyping(selectedConvo)
    }, [typing, debouceClearTyping, selectedConvo])

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
                    <Conversations conversations={conversations} setNewChatOpen={setNewChatOpen} selectedConvo={selectedConvo} onConversationSelect={onConversationSelect}/>
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
                    <Conversations conversations={conversations} setNewChatOpen={setNewChatOpen} selectedConvo={selectedConvo} onConversationSelect={onConversationSelect}/>
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
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <AddIcon />
                    </IconButton>
                    { typing && <Typography variant="body2" p={2}>{typing} is typing..</Typography> }
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
                            onKeyDown={onKeyDown}
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
