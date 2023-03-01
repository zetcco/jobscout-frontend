import { Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import { RouterLink } from '../../../../components/RouterLink'
import SmallPanel from '../../../../components/SmallPanel'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';

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
</Stack>
  )
}
