import React, { useState } from 'react'
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

export const JobSeekerHome = () => {
    const userId = useSelector(selectAuthUserId)
    const [ generateCVOpen, setGenerateCVOpen ] = useState(false)

  return (
    <Stack>
    <SmallPanel
        mainTitle = {'Actions'}
        noElevation
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
    >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={`/users/${userId}`}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <AccountCircleIcon sx = {{height:'30px' , width:'30px'}}/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MY PROFILE</Typography>
                    </Stack>
                </SelectableCard>
                </RouterLink>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/posts"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <WorkIcon sx = {{height:'30px' , width:'30px'}}/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>FIND JOBS</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <RouterLink to={"/questionaries"}>
                <SelectableCard>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                    <QuizIcon sx = {{height:'30px' , width:'30px'}}/>
                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>QUESTIONARIES</Typography>
                    </Stack> 
                </SelectableCard>
                </RouterLink>
                </Grid> 

                <Grid item xs={12} sm={6} md={3}>
                <SelectableCard onClick={() => { setGenerateCVOpen(true) }}>
                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                        <FileDownloadIcon sx = {{height:'30px' , width:'30px'}}/>
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
            </Grid>
    </SmallPanel> 
</Stack>
  )
}
