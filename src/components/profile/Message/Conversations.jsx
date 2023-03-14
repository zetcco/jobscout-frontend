import { Alert, AlertTitle, Avatar, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from 'features/authSlice';
import { 
    fetchConversationsIndexed,
    selectConversation,
    selectConversationError,
    selectConversationLoading,
    selectConversations,
    selectSelectedConversation } from 'features/indexedConversationSlice';
import CircularProgress from '@mui/material/CircularProgress';

export const Conversations = ({ setNewChatOpen }) => {

    const authUser = useSelector(selectAuthUser)
    const conversationLoading = useSelector(selectConversationLoading)
    const conversationError = useSelector(selectConversationError)
    const selectedConvo = useSelector(selectSelectedConversation)
    const conversations = useSelector(selectConversations);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchConversationsIndexed())
    }, [dispatch])

    const onConversationSelect = (id) => {
        dispatch(selectConversation(id))
    }

    // useEffect(() => {
    //     if (page === 0 && !messagesLoading) {
    //         dispatch(fetchConversationMessagesIndexed(selectedConvo?.id))
    //     }
    //     if (!read)
    //         dispatch(requestMarkConversationAsRead(selectedConvo?.id))
    // }, [selectedConvo])

    if (conversationError)
        return (
            <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
                <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    {conversationError.message}
                </Alert>
            </Stack>
        )

    return (
    <>
        {
            conversationLoading ? (
                <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
                    <CircularProgress sx={{ mx: 'auto' }}/>
                </Stack>
            ) : (
                <>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} m={2}>
                    <Typography variant="h5">Conversations</Typography>
                    <Button startIcon={<AddIcon/>} onClick={() => setNewChatOpen(true)}>New</Button>
                </Stack>
                <Divider/>
                { 
                    conversations.length > 0 ? (
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

                            let lastMessage = conversation.messages[conversation.messages.length - 1]?.content
                            
                            return (
                                <MenuItem key={index} selected={selectedConvo?.id === conversation.id} onClick={() => onConversationSelect(conversation.id)}>
                                    {/* <ProfileSmallWithName dpSize={30} sx={{ margin: 1 }} avatar={user?.displayPicture} name={ conversation.name ? conversation.name : user?.displayName}/> */}
                                    <Stack direction={"row"} spacing={1.5} alignItems="center">
                                        <Avatar alt={name} src={picture}/>
                                        <Stack direction={"column"}>
                                            <Typography fontWeight={!conversation.read && 'bold'}>{name}</Typography>
                                            <Typography variant='caption' fontWeight={!conversation.read && 'bold'}>{lastMessage}</Typography>
                                        </Stack>
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
        }
    </>
  )
}
