import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef } from 'react'

export const ChatBubble = forwardRef(({ sent, content, topSent, bottomSent, name }, ref) => {
  return (
    <Box sx={{
        alignSelf: sent ? 'flex-end' : 'flex-start',
        maxWidth: '40%', 
        mt: ( topSent ? 0.2 : 0.6 ),
        mb: ( bottomSent ? 0.2 : 0.6 )
      }}
      ref={ref}
    >
      { name && <Typography variant='caption'>{name}</Typography> }
      <Box sx={{ 
        backgroundColor: sent ? 'grey.300' : 'primary.main',
        color: sent ? undefined : 'white',
        borderRadius: 1,
        borderTopRightRadius: sent && topSent ? 0 : '20px',
        borderBottomRightRadius: (sent && bottomSent) ? 0 : '20px',
        borderTopLeftRadius: !sent && topSent ? 0 : '20px',
        borderBottomLeftRadius: !sent && bottomSent ? 0 : '20px',
        wordWrap: 'break-word',
        py: 1, px: 2
        }}
        >
          <Typography variant={"body2"} sx={{ fontWeight: 450, fontSize: 15 }}>{content}</Typography>
      </Box>
    </Box>
  )
})
