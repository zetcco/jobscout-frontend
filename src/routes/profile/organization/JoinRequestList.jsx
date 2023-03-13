import { Stack } from '@mui/material'
import React from 'react'
import JoinRequest from './JoinRequest'


export const  JoinRequestList = () => {
  return (
    <Stack direction={'row'} spacing={2}>
                <Stack spacing={2}>
                  <JoinRequest />
                  <JoinRequest />
                  <JoinRequest />
                  <JoinRequest />
                  
                 
                </Stack>
    </Stack>
  )
}
