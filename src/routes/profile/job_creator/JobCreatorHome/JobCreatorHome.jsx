import React, { useState , useEffect} from 'react'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import {Grid, Typography } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import WorkIcon from '@mui/icons-material/Work';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RouterLink } from '../../../../components/RouterLink'
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import axios from 'axios'

export const JobCreatorHome = () => {

    const [jobPostCount , setJobPostCount] = useState(0);
    const [activatedJobPostCount , setActivatedJobPostCount] = useState(0);
    const [deactivatedJobPostCount , setDeactivatedJobPostCount] = useState(0);
    const [holdedJobPostCount , setHoldedJobPostCount] = useState(0);
    const token  = useSelector(selectAuthUserToken);

    useEffect(()=>{
        const fetchJobPosts = async () =>{
            try {
                const response = await axios.get('/jobpost/count' , {
                    headers:{Authorization: `Bearer ${token}`}
                })
                const responseActivated = await axios.get('/jobpost/count/activated' , {
                    headers:{Authorization: `Bearer ${token}`}
                })
                const responseDeactivated = await axios.get('/jobpost/count/deactivated' , {
                    headers:{Authorization: `Bearer ${token}`}
                })
                const responseHolded = await axios.get('/jobpost/count/holded' , {
                    headers:{Authorization: `Bearer ${token}`}
                })
                
                setJobPostCount(response.data)
                setActivatedJobPostCount(responseActivated.data)
                setDeactivatedJobPostCount(responseDeactivated.data)
                setHoldedJobPostCount(responseHolded.data)

                console.log(response.data);
                console.log(responseActivated.data);
                console.log(responseDeactivated.data);
                console.log(responseHolded.data);
              
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobPosts()
    } , [token])

  return (
        
            <Stack direction = {'column'} spacing = {4}>
                <Stack>
                    <SmallPanel
                        mainTitle = {'Actions'}
                    >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <RouterLink to={"/posts/create"}>
                                        <SelectableCard>
                                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                        <AddBoxIcon sx = {{height:'30px' , width:'30px'}}/>
                                                        <Typography variant = 'h6'>CREATE</Typography>
                                                    </Stack> 
                                        </SelectableCard>
                                    </RouterLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <RouterLink to={"/posts/1/manage"}>
                                        <SelectableCard>
                                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                        <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                                                        <Typography variant = 'h6'>MANAGE</Typography>
                                                    </Stack> 
                                        </SelectableCard>
                                </RouterLink>
                                </Grid>
                                <Grid item xs={4}>
                                        <SelectableCard>
                                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                                        <WorkIcon sx = {{height:'30px' , width:'30px'}}/>
                                                        <Typography variant = 'h6'>VACCANCIES</Typography>
                                                    </Stack>
                                        </SelectableCard>
                                </Grid>
                            </Grid>
                    </SmallPanel> 
                </Stack>
               
                <Stack direction = {'row'} spacing = {2}>
                    <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'POSTS'}
                                    subtitle = {'No of job posts'}
                                    count = { jobPostCount }
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'ACTIVATED POSTS'}
                                    subtitle = {'No of activated posts'}
                                    count = { activatedJobPostCount }
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'HOLDED POSTS'}
                                    subtitle = {'No of holded posts'}
                                    count = { holdedJobPostCount }
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'DEACTIVATED POSTS'}
                                    subtitle = {'No of deactivated posts'}
                                    count = { deactivatedJobPostCount }
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack> 
        </Stack>
        
  )
}