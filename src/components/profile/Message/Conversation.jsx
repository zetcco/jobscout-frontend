import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { QuestionAnswerTwoTone } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationMessagesIndexed, requestMarkConversationAsRead, selectConversationPage, selectConversationReadState, selectMessagesIndexed, selectMessagesLoading, selectParticipants, selectSelectedConversation } from "features/indexedConversationSlice";
import { selectAuthUser } from "features/authSlice";
import { ConversationTypeBox } from "./ConversationTypeBox";

const drawerWidth = 300;

const Conversation = ({ setMobileOpen }) => {

    const { mixins: { toolbar } } = useTheme()
    const typeEl = useRef(null)
    const dispatch = useDispatch()

    const participants = useSelector(selectParticipants)
    const selectedConvo = useSelector(selectSelectedConversation);
    const messages = useSelector(selectMessagesIndexed)
    const messagesLoading = useSelector(selectMessagesLoading)
    const authUser = useSelector(selectAuthUser);
    const groupChat = participants?.length > 2 ? true : false;
    const page = useSelector(selectConversationPage)
    const read = useSelector(selectConversationReadState)

    const observer = useRef()
    const onScrollToTop = useCallback((elm) => {
        if (messagesLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) 
                dispatch(fetchConversationMessagesIndexed(selectedConvo.id))
        })
        if (elm) observer.current.observe(elm)
    }, [selectedConvo, messagesLoading])

    useEffect(() => {
        if (page === 0)
            dispatch(fetchConversationMessagesIndexed(selectedConvo.id))
        if (read === false)
            dispatch(requestMarkConversationAsRead(selectedConvo.id))
    }, [selectedConvo])

    return (
    <Box height={`calc(100vh - (${toolbar?.minHeight}px + ${8}px + ${typeEl.current?.clientHeight}px ))`}
        sx={{ 
            flexGrow: 1,
            paddingX: 2,
            minHeight: 'min-content',
            width: { xs: '100%', sm:  `calc(100vw - ${drawerWidth}px)`}
        }}
        >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }}>
            {
                messages?.length === 0 ? (
                    <Stack width={"100%"} height={"100%"} justifyContent="center" alignItems={"center"} spacing={2}>
                        <Typography align={"center"}>Start conversation by <br/> Sending a Message</Typography>
                        <QuestionAnswerTwoTone color="primary" fontSize="large"/>
                    </Stack>
                ) : (
                <>
                    {
                        messages?.map((message, index, arr) => { 
                            const absIndex = arr.length - index - 1
                            message = arr[absIndex]
                            let topSent = arr[absIndex-1]?.senderId === message.senderId ? true : false;
                            let bottomSent = arr[absIndex+1]?.senderId === message.senderId ? true : false;
                            let sent = message.senderId === authUser.id

                            let picture = null;
                            let name = null;
                            if (groupChat && !sent) {
                                picture = <Box sx={{ width: 26, height: 26, flexShrink: 0 }}></Box>
                                if (!topSent) {
                                    let sender = participants.find(participant => participant.id === message.senderId)
                                    picture = <Avatar src={sender.displayPicture} sx={{ width: 26, height: 26 }}/>
                                    name = sender.displayName.split(" ")[0]
                                }
                            }

                            return (
                                <ChatBubble 
                                    ref={ absIndex === 3 ? onScrollToTop : undefined }
                                    topSent={topSent}
                                    bottomSent={bottomSent}
                                    key={index}
                                    sent={sent}
                                    picture={picture}
                                    name={name}
                                    message={message}
                                />
                        )})
                    }
                </>
                )
            }
        </Box>
        { selectedConvo && <ConversationTypeBox ref={typeEl}/> }
    </Box>
  )
}

export default Conversation