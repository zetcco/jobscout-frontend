import React from 'react'
import { BasicCard } from '../BasicCard'
import { Stack } from '@mui/system'
import { Grid } from '@mui/material'

export const Profile = ({profileIcon , buttonSet1 , buttonSet2 , comments}) => {
  return (
        <BasicCard>
            <Stack direction={'column'} spacing={4}>
                <Stack direction={'row'} justifyContent = {'space-between'} spacing={2}>
                    <Stack>{ profileIcon }</Stack>
                    <Stack direction={'row'} spacing = {2}>{ buttonSet1}</Stack>
                </Stack>
                <Stack spacing= {4} direction={'row'}>
                    <Grid item xs = {3}>
                        <Stack direction = {'column'}>{ buttonSet2 }</Stack>
                    </Grid>
                    <Grid item xs = {9}>
                        <Stack direction = {'column'}>{ comments }</Stack>
                    </Grid>
                </Stack>
            </Stack>
        </BasicCard>
  )
} 
