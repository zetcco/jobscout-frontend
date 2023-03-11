import React, { useState } from 'react'
import { BasicCard } from '../../cards/BasicCard'
import { Stack } from '@mui/system'
import SmallPanel from '../../SmallPanel'
import { Button, TextField ,IconButton, Modal } from '@mui/material'
import { ProfileSmallWithName } from '../ProfileSmallWithName'
import { ProfileWithFullNameSubtitleSmall } from '../ProfileWithFullNameSubtitleSmall'
import SendIcon from '@mui/icons-material/Send';
import { ScheduleMeeting } from 'components/meeting/ScheduleMeeting'

export const Messaging = () => {

    const [ meetingModalOpen, setMeetingModalOpen ] = useState(false);

  return (
    <BasicCard fullHeight>
        <Stack direction={'row'} spacing = {4} sx={{ height: '100%' }}>
          
          <Stack>
            <SmallPanel 
                mainTitle={'Chats'}
                children = {[
                    <TextField 
                        id="outlined-basic" 
                        label="Search chats" 
                        variant="outlined"
                        placeholder = "Search"
                        fullWidth 
                            />,
                    <ProfileSmallWithName name = {'Nipun Madumal'}/>,
                    <ProfileSmallWithName name = {'Gayesh Chamoda'}/>,
                    <ProfileSmallWithName name = {'Gimhana Mahela'}/>,
                    <ProfileSmallWithName name = {'Indrajith Madumal'}/>,
                    <ProfileSmallWithName name = {'Mohammed Thanis'}/>,
                    <ProfileSmallWithName name = {'Nirosh Sooriyakantha'}/>,
                ]}
            />
          </Stack>
            
          <Stack direction={'column'} spacing = {4} flexGrow = {1}>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack alignItems={'center'}>
                    <ProfileWithFullNameSubtitleSmall
                        name = {'Nipun Madumal'}
                        subtitle = {'Job seeker'}
                    />
                </Stack>
                <Stack alignItems={'center'}>
                    <Button variant = {'outlined'} fullWidth onClick={() => setMeetingModalOpen(true)}>Schedule a meeting</Button>
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
                </Stack>         
            </Stack>



            <Stack flexGrow={1} flexDirection={'column'}>
                <BasicCard sx = {{height:'100%'}}flexDirection = {'column'} flexGrow = {1}/> 
            </Stack>

            <Stack direction = {'row'} spacing = {2}>
                <Stack flexGrow={1}>
                    <TextField 
                        id="outlined-basic" 
                        label="Send Message" 
                        variant="outlined"
                        placeholder = "Type the meassage "
                        fullWidth 
                    />
                </Stack>
                <Stack  justifyContent = {"center"}>
                    <IconButton size = 'large' variant = 'contained' fullWidth sx={{ height: '100%', width: '100%' }}><SendIcon color = 'success' fontSize='large'/></IconButton>
                </Stack>
            </Stack>

          </Stack>
        </Stack>
    </BasicCard>
  )
}
