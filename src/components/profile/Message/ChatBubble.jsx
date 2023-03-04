import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const ChatBubble = ({ sent, content, topSent, bottomSent }) => {
  return (
    <Box sx={{ 
      alignSelf: sent ? 'flex-end' : 'flex-start',
      maxWidth: '40%', 
      margin: 0.3,
      backgroundColor: sent ? 'grey.300' : 'primary.main',
      color: sent ? undefined : 'white',
      borderRadius: 1,
      borderTopRightRadius: sent && topSent ? 0 : '20px',
      borderBottomRightRadius: (sent && bottomSent) ? 0 : '20px',
      borderTopLeftRadius: !sent && topSent ? 0 : '20px',
      borderBottomLeftRadius: !sent && bottomSent ? 0 : '20px'
      }}>
        <Typography my={1.5} mx={2} variant={"body2"} sx={{ fontWeight: 450, fontSize: 15 }}>{content}</Typography>
    </Box>
  )
}
