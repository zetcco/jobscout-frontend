import { Stack } from '@mui/system'
import {Box, Button, CircularProgress, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ManageJobPostFrom from '../../components/job_postings/ManageJobPostFrom'
import SmallPanel from '../../components/SmallPanel'
import { useFetch } from 'hooks/useFetch'
import { useParams } from 'react-router-dom'
import { BasicCard } from 'components/cards/BasicCard'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ResponsiveIconButton } from 'components/ResponsiveIconButton'
import { CheckCircleOutline, DeleteOutline } from '@mui/icons-material'

function ManageJobPost() {

  const { postId } = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ applications, setApplications ] = useState([])
  const fetch = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetch(`/jobpost/${postId}/applications`, "GET", { onSuccess: setApplications })
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading)
    return (
      <Stack width={'100%'} justifyContent={'center'}>
          <CircularProgress sx={{ m: 'auto' }}/>
      </Stack>
    )

  return (
        <Stack justifyContent="space-around" alignItems="flex-start" spacing={3}>
          <Typography variant='h4'>Applicants</Typography>
          <Stack spacing={2}>
            {
              applications.map((application, index) => (
                <BasicCard sx={{ width: '100%' }} key={index}>
                    <Stack direction={'row'} spacing={{ xs: 2, md: 10 }}>
                        <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                            <AvatarWithInitials size={{ xs: 60, md: 70 }} src={application.jobSeeker.displayPicture} name={application.jobSeeker.displayName}/>
                            <Stack direction={'column'} spacing={0.2}>
                                <Typography variant='h5' fontWeight={600}>{ application.jobSeeker.displayName }</Typography>
                                <Typography fontSize={16}>{ application.jobSeeker.email }</Typography> 
                            </Stack>                      
                        </Stack>
                        <Stack direction={'row'} spacing={1}>
                            <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>}>Reject</ResponsiveIconButton>
                            <ResponsiveIconButton startIcon={<CheckCircleOutline/>}>Accept</ResponsiveIconButton>
                        </Stack>
                    </Stack>
                </BasicCard>

              ))
            } 
          </Stack>
        </Stack>
  )
}
export default ManageJobPost






