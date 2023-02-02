import React from 'react'
import { BasicCard } from '../../../../components/cards/BasicCard'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import {Grid, Typography } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';

export const JobCreatorHome = () => {
  return (
        <BasicCard>
            <Stack direction = {'column'} spacing = {4}>
                <Stack>
                    <SmallPanel
                        mainTitle = {'Actions'}
                    >
                            <Stack direction={'row'} spacing = {2} sx = {{justifyContent:'space-evenly'}}>
                                <SelectableCard
                                    sx  = {{flexGrow:1}}
                                    title = { 
                                            <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                <AddBoxIcon sx = {{height:'30px' , width:'30px'}}/>
                                                <Typography variant = 'h5'>CREATE</Typography>
                                             </Stack> }
                                    />
                                <SelectableCard
                                    sx  = {{flexGrow:1}}
                                    title = { 
                                            <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                                                <Typography variant = 'h5'>MANAGE</Typography>
                                            </Stack> }
                                    />

                                <SelectableCard
                                    sx  = {{flexGrow:1}}
                                    title = { 
                                            <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                <WorkIcon sx = {{height:'30px' , width:'30px'}}/>
                                                <Typography variant = 'h5'>VACANCIES</Typography>
                                            </Stack> }
                                    />
                            </Stack>
                    </SmallPanel> 
                </Stack>
               
                <Stack direction = {'row'} spacing = {2}>
                    <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'POSTS'}
                                    subtitle = {'No of job posts'}
                                    count = {6}
                                    color = {'blue'}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'ACTIVATED POSTS'}
                                    subtitle = {'No of activated posts'}
                                    count = {10}
                                    color = {'green'}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'DEACTIVATED POSTS'}
                                    subtitle = {'No of deactivated posts'}
                                    count = {2}
                                    color = {'red'}
                                />
                            </Stack>
                        </Grid>
                    </Grid>           
                </Stack>

            </Stack>
        </BasicCard>
  )
}
