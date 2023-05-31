import { Grid, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SelectableCard } from '../cards/SelectableCard'
import { RouterLink } from '../RouterLink'
import SmallPanel from '../SmallPanel'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import { ScheduleMeeting } from 'components/meeting/ScheduleMeeting'
import { AppRegistrationTwoTone, ManageAccountsTwoTone, PeopleAltTwoTone, RequestQuoteTwoTone, RssFeedTwoTone, VideoChatRounded, VideoChatTwoTone, WorkTwoTone } from '@mui/icons-material'
import { useState } from 'react'
import { JobCreatorHomeCards } from 'routes/profile/job_creator/JobCreatorHome/JobCreatorHomeCards'
import { useSelector } from 'react-redux'
import { selectAuthUserId } from 'features/authSlice'
import { useFetch } from 'hooks/useFetch'


export const OrganizationHome = () => {

    const [ meetingModalOpen, setMeetingModalOpen ] = useState(false);
    const [ stats, setStats ] = useState([0, 0, 0, 0])
    const userId = useSelector(selectAuthUserId)

    const fetch = useFetch()

    useEffect(() => {
        fetch(`/organization/${userId}/stats`, "GET", { onSuccess: setStats })
    }, [])

  return (
    <Stack direction = {'column'} spacing = {4}>
     <Stack>
        <Typography variant='h4' fontWeight={800}>Organization</Typography>
        <SmallPanel
            mainTitle = {'Actions'}
            noElevation
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
                <Grid container spacing={2}>
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
                        <RouterLink to={"/posts/manage"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <AppRegistrationTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>MANAGE</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                    </Grid>
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/join-requests"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <RequestQuoteTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>REQUESTS</Typography>
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
                        <Grid item xs={6} md={3}>
                        <RouterLink to={"/employees"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <ManageAccountsTwoTone sx = {{ height:30, width:30 }} color='primary'/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1} color={'primary.darker'}>EMPLOYEES</Typography>
                                </Stack> 
                            </SelectableCard>
                        </RouterLink>
                        </Grid>
                </Grid>
        </SmallPanel>
        <SmallPanel
            mainTitle = {'Stats'}
            noElevation
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
            <Stack direction = {'row'} spacing = {2}>
                <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                    <Grid item xs = {12} md = {6}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'JOB POSTS'}
                                subtitle = {'No of Job Posts'}
                                count = { stats[0] }
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {6}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'ACTIVATED POSTS'}
                                subtitle = {'No of Rejected applications'}
                                count = { stats[1] }
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {6}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'EMPLOYEES'}
                                subtitle = {'No of Employees'}
                                count = { stats[2] }
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {6}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'JOIN REQUESTS'}
                                subtitle = {'No of Join Requests'}
                                count = { stats[3] }
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack> 
        </SmallPanel>
      </Stack>
    </Stack>  
  )
}
