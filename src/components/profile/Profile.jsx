import React from 'react'
import { BasicCard } from '../BasicCard'
import { Stack } from '@mui/system'
import { Box, Grid } from '@mui/material'


export const Profile = ({profileIcon , buttonSet1 , buttonSet2 , contend}) => {
  return (
        <BasicCard>
            <Stack direction={'column'} spacing={6}>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    { profileIcon }
                    {buttonSet1 && <Stack direction={"row"} alignItems="center" spacing={2}>
                        {buttonSet1}
                    </Stack>}
                </Stack>
                <Stack spacing= {4} direction={'row'}>
                    <Box sx={{ flexGrow: 4, }}><Stack direction = {'column'} spacing={4}>{ buttonSet2 }</Stack></Box>
                    <Box sx={{ flexGrow: 4, }}><Stack direction = {'column'} spacing = {4}>{ contend }</Stack></Box>
                </Stack>
            </Stack>
        </BasicCard>
  )
} 
