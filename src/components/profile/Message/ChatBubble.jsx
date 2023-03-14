import { MoreHoriz } from '@mui/icons-material'
import { Avatar, Button, IconButton, Popover, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { BasicCard } from 'components/cards/BasicCard'
import { sendSignal } from 'features/websocketSlice'
import React, { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export const ChatBubble = forwardRef(({ sent, topSent, bottomSent, name, message, picture }, ref) => {

  const [showHover, setShowHover] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()

  const sendDelete = () => {
      dispatch(sendSignal(`/messaging/${message.conversationId}`, "DELETE", { messageId: message.id }))
  }

  return (
    <Box sx={{
        alignSelf: sent ? 'flex-end' : 'flex-start',
        maxWidth: '40%', 
        mt: ( topSent ? 0.2 : 0.6 ),
        mb: ( bottomSent ? 0.2 : 0.6 )
      }}
      ref={ref}
      component="div"
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      <Stack direction={"column"}>
      { name && <Typography variant='caption'>{name}</Typography> }
      <Stack direction={ sent ? "row-reverse" : "row" } alignItems="center" spacing={1}>
        { picture }
        <Box sx={{ 
          backgroundColor: sent ? 'grey.300' : 'primary.main',
          color: sent ? undefined : 'white',
          borderRadius: 1,
          borderTopRightRadius: sent && topSent ? 0 : '20px',
          borderBottomRightRadius: (sent && bottomSent) ? 0 : '20px',
          borderTopLeftRadius: !sent && topSent ? 0 : '20px',
          borderBottomLeftRadius: !sent && bottomSent ? 0 : '20px',
          wordWrap: 'break-word',
          width: '100%',
          py: 1.2, px: 2
          }}
          >
            <Typography variant={"body2"} sx={{ fontWeight: 450, fontSize: 15 }}>{message.content}</Typography>
        </Box>
        { showHover && sent && (
          <IconButton onClick={(e) => { setAnchorEl(e.target) }}>
            <MoreHoriz/>
          </IconButton>
        )}
        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
          <BasicCard padding={2}>
            <Button color='error' onClick={sendDelete}>Delete</Button>
          </BasicCard>
        </Popover>
      </Stack>
      </Stack>
    </Box>
  )
})
