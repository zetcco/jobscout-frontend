import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system'
import { RouterLink } from 'components/RouterLink'
import SmallPanel from 'components/SmallPanel'
import { SelectableCard } from 'components/cards/SelectableCard'
import { Typography , Grid, Modal} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import QuizIcon from '@mui/icons-material/Quiz';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useSelector } from 'react-redux'
import { selectAuthUserId } from 'features/authSlice'
import { GenerateCV } from 'components/profile/GenerateCV'
import { AccountCircleTwoTone, FileDownloadTwoTone, PeopleTwoTone, QuizTwoTone, RssFeedTwoTone, WorkTwoTone } from '@mui/icons-material'
import { JobCreatorHomeCards } from '../job_creator/JobCreatorHome/JobCreatorHomeCards'
import { useFetch } from 'hooks/useFetch'

export const JobSeekerHome = () => {
    const userId = useSelector(selectAuthUserId)
    const [ generateCVOpen, setGenerateCVOpen ] = useState(false)
    const [ stats, setStats ] = useState([0, 0, 0, 0])

    const fetch = useFetch()

    useEffect(() => {
        fetch(`/job-seeker/${userId}/stats`, "GET", { onSuccess: setStats })
    }, [])

  return (
    <Stack>
    <SmallPanel
        mainTitle = {'Actions'}
        noElevation
    >
            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={`/users/${userId}`}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <AccountCircleTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MY PROFILE</Typography>
                    </Stack>
                </SelectableCard>
                </RouterLink>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/posts"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <WorkTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>FIND JOBS</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/questionaries"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <QuizTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>QUESTIONARIES</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <SelectableCard onClick={() => { setGenerateCVOpen(true) }}>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <FileDownloadTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>DOWNLOAD CV</Typography>
                    </Stack> 
                </SelectableCard>
                <Modal
                    open={generateCVOpen}
                    onClose={() => { setGenerateCVOpen(false) }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <GenerateCV onClose={() => { setGenerateCVOpen(false) }}/>
                </Modal>
                </Grid>  

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/users/applications"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <QuizTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>APPLICATIONS</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/blog"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <RssFeedTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>BLOG</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/people"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <PeopleTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>FIND PEOPLE</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/users/applications"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <QuizTwoTone sx = {{height:'30px' , width:'30px'}} color='primary'/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>APPLICATIONS</Typography>
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
                            title = {'APPLICATIONS'}
                            subtitle = {'No of Applied Applications'}
                            count = { stats[0] }
                        />
                    </Stack>
                </Grid>
                <Grid item xs = {12} md = {6}>
                    <Stack flexGrow={1}>
                        <JobCreatorHomeCards
                            title = {'REJECTED APPLICATIONS'}
                            subtitle = {'No of Rejected applications'}
                            count = { stats[1] }
                        />
                    </Stack>
                </Grid>
                <Grid item xs = {12} md = {6}>
                    <Stack flexGrow={1}>
                        <JobCreatorHomeCards
                            title = {'ACCEPTED APPLICATIONS'}
                            subtitle = {'No of Accepted Applications'}
                            count = { stats[2] }
                        />
                    </Stack>
                </Grid>
                <Grid item xs = {12} md = {6}>
                    <Stack flexGrow={1}>
                        <JobCreatorHomeCards
                            title = {'INTERVIEWS'}
                            subtitle = {'No of Interviews'}
                            count = { stats[3] }
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Stack> 
    </SmallPanel>
</Stack>
  )
}
