import React, { useState , useEffect} from 'react'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import {Grid, Modal, Typography } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RouterLink } from '../../../../components/RouterLink'
import { serverClient } from 'features/authSlice'
import { ScheduleMeeting } from 'components/meeting/ScheduleMeeting'
import { AddBoxTwoTone, AppRegistrationRounded, ManageAccountsTwoTone, PeopleAltRounded, PeopleAltTwoTone, PeopleRounded, Person, RecommendTwoTone, RssFeed, RssFeedTwoTone, VideoChatRounded, VideoChatTwoTone, Work, WorkTwoTone } from '@mui/icons-material'
import RecommendIcon from '@mui/icons-material/Recommend';
import { useSelector } from 'react-redux'
import { selectAuthUserId } from 'features/authSlice'

export const JobCreatorHome = () => {

    const [ meetingModalOpen, setMeetingModalOpen ] = useState(false);
    const userId = useSelector(selectAuthUserId)
    const [jobPostCount , setJobPostCount] = useState(0);
    const [activatedJobPostCount , setActivatedJobPostCount] = useState(0);
    const [deactivatedJobPostCount , setDeactivatedJobPostCount] = useState(0);
    const [holdedJobPostCount , setHoldedJobPostCount] = useState(0);

    useEffect(()=>{
        const fetchJobPosts = async () =>{
            try {
                const response = await serverClient.get('/jobpost/count')
                const responseActivated = await serverClient.get('/jobpost/count/activated')
                const responseDeactivated = await serverClient.get('/jobpost/count/deactivated')
                const responseHolded = await serverClient.get('/jobpost/count/holded')
                
                setJobPostCount(response.data)
                setActivatedJobPostCount(responseActivated.data)
                setDeactivatedJobPostCount(responseDeactivated.data)
                setHoldedJobPostCount(responseHolded.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobPosts()
    } , [])

    return (
        <Stack direction = {'column'}>
            <Typography variant='h4' fontWeight={800}>Job Creator</Typography>
            <SmallPanel
                mainTitle = {'Actions'}
                noElevation
            >
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <RouterLink to={"/posts/create"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <AddBoxTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>CREATE</Typography>
                                </Stack>
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <RouterLink to={"/posts/manage"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <AppRegistrationRounded sx = {{height:'30px' , width:'30px'}} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>MANAGE</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <SelectableCard onClick={() => { setMeetingModalOpen(true) }}>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <VideoChatTwoTone sx={{ height: 30, width: 30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>MEET</Typography>
                                </Stack> 
                            </SelectableCard>
                            <Modal
                                open={meetingModalOpen}
                                onClose={() => setMeetingModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ScheduleMeeting/>
                            </Modal>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/manage/recommendation"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <RecommendTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>RECOMMEND</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={`/users/${userId}`}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <ManageAccountsTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>MY PROFILE</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/posts"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <WorkTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>JOBS</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/people"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <PeopleAltTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>FIND PEOPLE</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/blog"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <RssFeedTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>BLOG</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                    </Grid>
            </SmallPanel>
            <SmallPanel
                mainTitle = {'Stats'}
                noElevation
            >
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
            </SmallPanel>
        </Stack>
  )
}