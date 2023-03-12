import { Alert, AlertTitle, Avatar, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { selectAuthUser } from 'features/authSlice';
import { selectConversationError, selectConversationLoading } from 'features/indexedConversationSlice';
import CircularProgress from '@mui/material/CircularProgress';

export const Conversations = ({ conversations, setNewChatOpen, selectedConvo, onConversationSelect }) => {

    const authUser = useSelector(selectAuthUser)
    const conversationLoading = useSelector(selectConversationLoading)
    const conversationError = useSelector(selectConversationError)

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
                    <Typography variant="h5">Chats</Typography>
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
        }
    </>
  )
}
