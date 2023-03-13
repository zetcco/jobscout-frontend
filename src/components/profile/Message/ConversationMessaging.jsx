import { Box, Drawer, IconButton, Modal, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { selectAuthUser } from "features/authSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { ChatBubble } from "./ChatBubble";
import AddIcon from '@mui/icons-material/Add';
import { NewChat } from "./NewChat";
import { debounce } from "lodash";
import { Conversations } from "./Conversations";
import { fetchConversationMessagesIndexed, fetchConversationsIndexed, selectAllConversations, selectConversationById, selectConversationPage, selectConversations, selectMessagesIndexed, selectMessagesLoading, selectParticipants, selectTyping, sendSignalToConversation, stopTyping } from "features/indexedConversationSlice";

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

    const chatBoxEl = useRef(null)

    const messages = useSelector((state) => selectMessagesIndexed(state, selectedConvo))
    const participants = useSelector((state) => selectParticipants(state, selectedConvo))
    const page = useSelector((state) => selectConversationPage(state, selectedConvo))
    const groupChat = participants?.length > 2 ? true : false;
    const typing = useSelector((state) => selectTyping(state, selectedConvo))
    const messagesLoading = useSelector(selectMessagesLoading)

    useEffect(() => {
        dispatch(fetchConversationsIndexed())
    }, [dispatch])

    useEffect(() => {
        if (!selectedConvo && conversations[0] && !messagesLoading) {
            // setSelectedConvo(conversations[0]?.id) 
            // dispatch(fetchConversationMessagesIndexed(conversations[0]?.id))
        }
    }, [conversations, dispatch])

    useEffect(() => {
        if (page === 0)
            dispatch(fetchConversationMessagesIndexed(selectedConvo))
    }, [selectedConvo])

    const observer = useRef()
    const onScrollToTop = useCallback((elm) => {
        if (messagesLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                dispatch(fetchConversationMessagesIndexed(selectedConvo))
            }
        })
        if (elm) observer.current.observe(elm)
    }, [selectedConvo, messagesLoading])

    const sendMessage = () => {
        dispatch(sendSignalToConversation(selectedConvo, "MESSAGE", message))
        setMessage('')
    }

    const onTyping = (e) => {
        if (selectedConvo) {
            setMessage(e.target.value)
            // dispatch(sendSignalToConversation(selectedConvo, "TYPING" ))
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13)
            sendMessage()
    }

    const debouceClearTyping = useCallback(
        debounce((selectedConvo) => {
            // dispatch(stopTyping(selectedConvo))
        }, [1000]), 
    []);

    useEffect(() => {
        // debouceClearTyping(selectedConvo)
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
                    <Conversations conversations={conversations} setNewChatOpen={setNewChatOpen} selectedConvo={selectedConvo} onConversationSelect={setSelectedConvo}/>
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
                    <Conversations conversations={conversations} setNewChatOpen={setNewChatOpen} selectedConvo={selectedConvo} onConversationSelect={setSelectedConvo}/>
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
                    minHeight: 'min-content',
                    width: { xs: '100%', sm:  `calc(100vw - ${drawerWidth}px)`}
                }}
                >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }} ref={chatBoxEl}>
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
                        messages?.length === 0 ? (
                            <>
                                <Typography>Start by sending a message 👋</Typography>
                            </>
                        ) : (
                        <>
                            {
                                messages?.map((message, index, arr) => { 
                                    const absIndex = arr.length - index - 1
                                    message = arr[absIndex]
                                    let topSent = arr[absIndex-1]?.senderId === message.senderId ? true : false;
                                    let bottomSent = arr[absIndex+1]?.senderId === message.senderId ? true : false;
                                    let sent = message.senderId === authUser.id
                                    return (
                                        <ChatBubble 
                                            name={
                                                (groupChat && !sent && !topSent) ? participants.find(participant => participant.id === message.senderId).displayName.split(" ")[0] : undefined
                                            }
                                            ref={ absIndex === 3 ? onScrollToTop : undefined }
                                            topSent={topSent}
                                            bottomSent={bottomSent}
                                            key={index}
                                            sent={sent}
                                            content={message.content}
                                        />
                                )})
                            }
                        </>
                        )
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
