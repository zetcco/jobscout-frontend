import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const ChatBubble = ({ sent, content }) => {
  return (
    <Box sx={{ alignSelf: sent ? 'flex-end' : 'flex-start', maxWidth: '40%' }}>
        <Typography>{content}</Typography>
    </Box>
  )
}
