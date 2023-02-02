import React from 'react'
import { BasicCard } from '../../../../components/cards/BasicCard'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import { Button , Grid } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const JobCreatorHome = () => {
  return (
        <BasicCard>
            <Stack direction = {'column'} spacing = {4}>
                <Stack>
                    <SmallPanel
                        mainTitle = {'Actions'}
                    >
                            <Stack direction={'row'} spacing = {2}>
                                <Button variant = 'outlined' sx = {{height:'100px' , fontSize:'25px'}} startIcon = {<AddBoxIcon sx = {{width:'30px', height: '30px'}}/>} fullWidth >Create</Button>
                                <Button variant = 'outlined' sx = {{height:'100px' , fontSize:'25px'}} startIcon = {<ManageAccountsIcon sx = {{width:'30px', height: '30px'}}/>} fullWidth >Manage</Button>
                            </Stack>
                    </SmallPanel> 
                </Stack>
                <Stack direction = {'row'} spacing = {2}>
                    <Grid container spacing={2}>
                    <Grid item xs = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'No of job posts'}
                                count = {6}
                                color = {'blue'}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'No of activated posts'}
                                count = {10}
                                color = {'green'}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'No of deactivated posts'}
                                count = {2}
                                color = {'red'}
                            />
                        </Stack>
                    </Grid></Grid>
                </Stack>
            </Stack>
        </BasicCard>
  )
}
