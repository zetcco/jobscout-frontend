import React from 'react'
import { BasicCard } from '../../BasicCard'
import { Stack } from '@mui/system'
import SmallPanel from '../../SmallPanel'
import { Button, TextField , Box } from '@mui/material'
import { ProfileSmallWithName } from '../ProfileSmallWithName'
import { ProfileWithFullNameSubtitleSmall } from '../ProfileWithFullNameSubtitleSmall'

export const Messaging = () => {
  return (
    <BasicCard>
        <Stack direction={'row'} spacing = {4}>
          
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

          <Stack direction={'column'} spacing = {4}>
            
            <Stack direction={'row'} justifyContend={'space-between'}>
                <Stack alignItems={'center'}>
                    <ProfileWithFullNameSubtitleSmall
                        name = {'Nipun Madumal'}
                        subtitle = {'Job seeker'}
                    />
                </Stack>
                <Stack alignItems={'center'}>
                    <Button vatiant = {'outlined'} fullWidth>Schedule a meeting</Button>
                </Stack>         
            </Stack>

            <Stack>
                <Box margin={'auto'}></Box> 
            </Stack>

            <Stack >
                <Stack>
                    <TextField></TextField>
                </Stack>
                <Stack>
                    <Button></Button>
                </Stack>
            </Stack>
            
          </Stack>
        </Stack>
    </BasicCard>
  )
}
