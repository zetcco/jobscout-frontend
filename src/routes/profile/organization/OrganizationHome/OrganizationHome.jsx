import { Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import { RouterLink } from '../../../../components/RouterLink'
import SmallPanel from '../../../../components/SmallPanel'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import { OrganizationHomeCard } from './OrganizationHomeCard'

export const OrganizationHome = () => {
  return (
<Stack direction = {'column'} spacing = {4}>
            <Stack>
                <SmallPanel
                    mainTitle = {'Actions'}
                >
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            <RouterLink to={"/posts/create"}>
                            <SelectableCard
                                title = { 
                                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                            <AddBoxIcon sx = {{height:'30px' , width:'30px'}}/>
                                            <Typography variant = 'h6'>CREATE</Typography>
                                        </Stack> }
                                />
                            </RouterLink>
                            </Grid>
                            <Grid item xs={4}>
                            <RouterLink to={"/posts/1/manage"}>
                            <SelectableCard
                                title = { 
                                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                            <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                                            <Typography variant = 'h6'>MANAGE</Typography>
                                        </Stack> }
                                />
                            </RouterLink>
                            </Grid>
                            <Grid item xs={4}>
                            <SelectableCard
                                title = { 
                                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                            <WorkIcon sx = {{height:'30px' , width:'30px'}}/>
                                            <Typography variant = 'h6'>VACCANCIES</Typography>
                                        </Stack> }
                                />
                            </Grid>
                        </Grid>
                </SmallPanel> 
            </Stack>
            <Stack direction = {'row'} spacing = {2}>
                    <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <OrganizationHomeCard
                                    title = {'POSTS'}
                                    subtitle = {'No of job posts'}
                                    count = {10}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <OrganizationHomeCard
                                    title = {'ACTIVATED POSTS'}
                                    subtitle = {'No of activated posts'}
                                    count = {07}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {4}>
                            <Stack flexGrow={1}>
                                <OrganizationHomeCard
                                    title = {'DEACTIVATED POSTS'}
                                    subtitle = {'No of deactivated posts'}
                                    count = {1}
                                />
                            </Stack>
                        </Grid>
                    </Grid>           
            </Stack>    
</Stack>
  )
}
