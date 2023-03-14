import { IconButton, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { selectSelectedConversation, sendSignalToConversation } from 'features/indexedConversationSlice'
import React, { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';

export const ConversationTypeBox = forwardRef((props, ref) => {

    const [ message, setMessage ] = useState('')
    const dispatch = useDispatch()
    const selectedConvo = useSelector(selectSelectedConversation);

    const sendMessage = () => {
        dispatch(sendSignalToConversation(selectedConvo.id, "MESSAGE", message))
        setMessage('')
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13)
            sendMessage()
    }

    return (
        <Stack direction = {'row'} spacing={2} ref={ref} py={1}>
            <Stack flexGrow={1}>
                <TextField 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
    )
})
