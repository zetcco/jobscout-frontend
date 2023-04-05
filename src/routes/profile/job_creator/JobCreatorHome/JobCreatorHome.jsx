import React, { useState } from 'react'
import { Stack } from '@mui/system'
import SmallPanel from '../../../../components/SmallPanel'
import {Grid, Modal, Typography } from '@mui/material'
import { JobCreatorHomeCards } from './JobCreatorHomeCards'
import { SelectableCard } from '../../../../components/cards/SelectableCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RouterLink } from '../../../../components/RouterLink'
import { ScheduleMeeting } from 'components/meeting/ScheduleMeeting'
import { VideoChatRounded } from '@mui/icons-material'
import RecommendIcon from '@mui/icons-material/Recommend';

export const JobCreatorHome = () => {

    const [ meetingModalOpen, setMeetingModalOpen ] = useState(false);

    return (
        <Stack direction = {'column'}>
            <Stack>
                <SmallPanel
                    mainTitle = {'Actions'}
                    noElevation
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                            <RouterLink to={"/posts/create"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <AddBoxIcon sx = {{height:'30px' , width:'30px'}}/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1}>CREATE</Typography>
                                </Stack>
                            </SelectableCard>
                            </RouterLink>
                            </Grid>
                            <Grid item xs={3}>
                            <RouterLink to={"/posts/1/manage"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <ManageAccountsIcon sx = {{height:'30px' , width:'30px'}}/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MANAGE</Typography>
                                </Stack> 
                            </SelectableCard>
                            </RouterLink>
                            </Grid>
                            <Grid item xs={3}>
                                <SelectableCard onClick={() => setMeetingModalOpen(true)}>
                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                        <VideoChatRounded sx={{ height: 30, width: 30 }}/>
                                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MEET</Typography>
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
                            <Grid item xs={3}>
                            <RouterLink to={"/manage/recommendation"}>
                                <SelectableCard onClick={() => setMeetingModalOpen(true)}>
                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                        <RecommendIcon sx = {{ height:30, width:30 }}/>
                                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>RECOMMEND</Typography>
                                    </Stack> 
                                </SelectableCard>
                            </RouterLink>
                            </Grid>
                        </Grid>
                </SmallPanel> 
            </Stack>
            
            <SmallPanel
                mainTitle={"Stats"}
                noElevation
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            >
            <Stack direction = {'row'} spacing = {2}>
                <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'POSTS'}
                                subtitle = {'No of job posts'}
                                count = {6}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'ACTIVATED POSTS'}
                                subtitle = {'No of activated posts'}
                                count = {10}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'DEACTIVATED POSTS'}
                                subtitle = {'No of deactivated posts'}
                                count = {2}
                            />
                        </Stack>
                    </Grid>
                </Grid>           
            </Stack>
            </SmallPanel>

        </Stack>
        
  )
}
