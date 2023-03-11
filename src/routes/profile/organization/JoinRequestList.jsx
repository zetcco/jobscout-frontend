import React from 'react'
import { Typography , Button } from '@mui/material'
import { Box, Stack } from '@mui/material'
import ProfileWithHeader from 'components/profile/ProfileWithHeader'
import { BasicCard } from 'components/cards/BasicCard'

export const JoinRequestList = () => {
  return (
    <BasicCard>
        <Stack  
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}>
        <Box>
        <Stack spacing={1}>
        <ProfileWithHeader name={'Request Name'} />
          <Typography>
              Details..............................................................................................................................
          </Typography>
        </Stack>
         </Box> 
         <Box>
        <Stack 
            direction="row"
            spacing={2}>
                <Button variant="outlined">ACCEPT</Button>
                <Button variant="outlined">REJECT</Button>
            </Stack>
         </Box> 
        </Stack>
    </BasicCard>
  )
}
export default JoinRequestList