import { Stack } from '@mui/system'
import React from 'react'
import  { JoinRequestList } from './JoinRequestList'

export const  JoinRequest = () => {
  return (
    <Stack direction={'row'} spacing={2}>
                <Stack spacing={2}>
                  <JoinRequestList />
                  <JoinRequestList />
                  <JoinRequestList />
                  <JoinRequestList />
                  
                 
                </Stack>
    </Stack>
  )
}
