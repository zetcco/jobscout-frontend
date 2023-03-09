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
        >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                    <SelectableCard
                        title = { 
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    {/* <WorkIcon sx = {{height:'30px' , width:'30px'}}/> */}
                                    <VideoChatRounded sx={{ height: 30, width: 30 }}/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MEET</Typography>
                                </Stack> 
                                }
                            onClick={() => setMeetingModalOpen(true)}
                            />
                        <Modal
                                open={meetingModalOpen}
                                onClose={() => setMeetingModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                            <ScheduleMeeting/>
                        </Modal>
                    </Grid>
                    <Grid item xs={4}>
                    <RouterLink to={"/posts/1/manage"}>
                    <SelectableCard
                        title = { 
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                                    <Typography variant = 'h6'>REQUEST</Typography>
                                </Stack> }
                        />
                    </RouterLink>
                    </Grid>
                    <Grid item xs={4}>
                    <SelectableCard
                        title = { 
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <WorkIcon sx = {{height:'30px' , width:'30px'}}/>
                                    <Typography variant = 'h6'>Vaccanies</Typography>
                                </Stack> }
                        />
                    </Grid>
                </Grid>
        </SmallPanel>
      </Stack>
    </Stack>  
  )
}
