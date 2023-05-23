import { Grid, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { SelectableCard } from '../cards/SelectableCard'
import { RouterLink } from '../RouterLink'
import SmallPanel from '../SmallPanel'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import { ScheduleMeeting } from 'components/meeting/ScheduleMeeting'
import { VideoChatRounded } from '@mui/icons-material'
import { useState } from 'react'


export const OrganizationHome = () => {

    const [ meetingModalOpen, setMeetingModalOpen ] = useState(false);

  return (
    <Stack direction = {'column'} spacing = {4}>
     <Stack>
        <SmallPanel
            mainTitle = {'Actions'}
            noElevation
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                    <SelectableCard>
                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                            <VideoChatRounded sx={{ height: 30, width: 30 }}/>
                            <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MEET</Typography>
                        </Stack> 
                    </SelectableCard>
                    </Grid>
                    <Grid item xs={4}>
                    <RouterLink to={"/join-requests"}>
                    <SelectableCard>
                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                            <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                            <Typography fontSize={17} fontWeight={650} letterSpacing={1}>REQUESTS</Typography>
                        </Stack>
                    </SelectableCard>
                    </RouterLink>
                    </Grid>
                </Grid>
        </SmallPanel>
      </Stack>
    </Stack>  
  )
}
