import React, { useState , useEffect} from 'react'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import {Grid, Typography } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import { RouterLink } from '../../../../components/RouterLink'
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import axios from 'axios'

export const JobCreatorHome = () => {

    const [jobPostsCount , setJobPostsCount] = useState([]);
    const token  = useSelector(selectAuthUserToken);

    useEffect(()=>{
        const fetchJobPosts = async () =>{
            try {
                const response = await axios.get('/jobpost/count' , {
                    headers:{Authorization: `Bearer ${token}`}
                })
                setJobPostsCount(response.data)
                console.log(response.data);
              
            } catch (error) {
                console.error(error)
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
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'POSTS'}
                                    subtitle = {'No of job posts'}
                                    count = {12}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'ACTIVATED POSTS'}
                                    subtitle = {'No of activated posts'}
                                    count = {8}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'HOLDED POSTS'}
                                    subtitle = {'No of holded posts'}
                                    count = {1}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <Stack flexGrow={1}>
                                <JobCreatorHomeCards
                                    title = {'DEACTIVATED POSTS'}
                                    subtitle = {'No of deactivated posts'}
                                    count = {3}
                                />
                            </Stack>
                        </Grid>
                    </Grid>           
                </Stack>

            </Stack>
        
  )
}
