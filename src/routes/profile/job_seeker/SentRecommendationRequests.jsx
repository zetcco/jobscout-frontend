import { OpenInFull } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ResponsiveIconButton } from 'components/ResponsiveIconButton'
import { BasicCard } from 'components/cards/BasicCard'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SentRecommendationRequests = () => {

    const fetch = useFetch()
    const [ requests, setRequests ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/recommendations/sent-requests`, "GET", { onSuccess: setRequests, onError: "Could not get Requests" })
    }, [])

    return (
        <Stack direction={'column'} spacing={4}>
        <Typography variant='h4'>Recommendations</Typography>
        <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={5}>
            <Stack spacing={3}>
                {
                    requests.length === 0 ? (
                        <Typography>No Requests sent yet..</Typography>
                    ) : (
                        <Stack direction={'column'} spacing={1}>
                            {
                                requests.map(request => (
                                    <BasicCard sx={{ width: '100%' }} key={request.id}>
                                        <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} justifyContent={'space-between'}>
                                            <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                                                <AvatarWithInitials size={{ xs: 60, md: 70 }} src={request.displayPicture} name={request.displayName}/>
                                                <Stack direction={'column'} spacing={0.2}>
                                                    <Typography variant='h5' fontWeight={600}>{ request.displayName }</Typography>
                                                    <Typography fontSize={16}>{ request.email }</Typography> 
                                                </Stack>                      
                                            </Stack>
                                            <Stack direction={'row'} spacing={1}>
                                                {/* <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>} onClick={() => { onDelete(requester.id) }}>Delete</ResponsiveIconButton> */}
                                                <ResponsiveIconButton onClick={() => { navigate(`/users/${request.id}`) }} startIcon={<OpenInFull/>}>View Profile</ResponsiveIconButton>
                                            </Stack>
                                        </Stack>
                                    </BasicCard>
                                ))
                            }
                        </Stack>
                    )
                }
            </Stack>
            </Stack>
        </Stack>
    )
}
