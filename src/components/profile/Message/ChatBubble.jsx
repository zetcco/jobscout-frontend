import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef } from 'react'

export const ChatBubble = forwardRef(({ sent, content, topSent, bottomSent }, ref) => {
  return (
    <Box sx={{ 
      alignSelf: sent ? 'flex-end' : 'flex-start',
      maxWidth: '60%', 
      margin: 0.3,
      backgroundColor: sent ? 'grey.300' : 'primary.main',
      color: sent ? undefined : 'white',
      borderRadius: 1,
      borderTopRightRadius: sent && topSent ? 0 : '20px',
      borderBottomRightRadius: (sent && bottomSent) ? 0 : '20px',
      borderTopLeftRadius: !sent && topSent ? 0 : '20px',
      borderBottomLeftRadius: !sent && bottomSent ? 0 : '20px',
      wordWrap: 'break-word'
      }}
      ref={ref}
      >
        <Typography my={1.5} mx={2} variant={"body2"} sx={{ fontWeight: 450, fontSize: 15 }}>{content}</Typography>
    </Box>
  )
})
