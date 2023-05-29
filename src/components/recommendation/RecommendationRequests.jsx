import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { AvatarWithInitials } from 'components/AvatarWithInitials';
import { ResponsiveIconButton } from 'components/ResponsiveIconButton';
import { BasicCard } from 'components/cards/BasicCard';
import { useFetch } from 'hooks/useFetch';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function RecommendationRequests() {
    const [ requesters, setRequesters ] = useState([]);
    const navigate = useNavigate()
    const fetch = useFetch()

    useEffect(() => {
        fetch('/recommendations/requests', "GET", { errorMsg: "Failed to get requests", onSuccess: (data) => { setRequesters(data) } })
    }, []);
    
    const onDelete = async (id) => {
        fetch(`/recommendations/delete?requester=${id}`, "DELETE", { successMsg: "Request deleted", onSuccess: () => { setRequesters(requesters.filter(request => request.id !== id)) } })
    }

    return (
        <Stack direction={'column'} spacing={2}>
            {
                requesters.length === 0 ? (
                    <Typography variant='h6'>No requests yet..</Typography>
                ): (
                    requesters.map(
                        (requester, index) => (
                            <BasicCard sx={{ width: '100%' }} key={index}>
                                <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} justifyContent={'space-between'}>
                                    <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                                        <AvatarWithInitials size={{ xs: 60, md: 70 }} src={requester.displayPicture} name={requester.displayName}/>
                                        <Stack direction={'column'} spacing={0.2}>
                                            <Typography variant='h5' fontWeight={600}>{ requester.displayName }</Typography>
                                            <Typography fontSize={16}>{ requester.email }</Typography> 
                                        </Stack>                      
                                    </Stack>
                                    <Stack direction={'row'} spacing={1}>
                                        <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>} onClick={() => { onDelete(requester.id) }}>Delete</ResponsiveIconButton>
                                        <ResponsiveIconButton onClick={() => { navigate(`/manage/recommendation/${requester.id}`) }} startIcon={<AddCircleOutline/>}>Recommend</ResponsiveIconButton>
                                    </Stack>
                                </Stack>
                            </BasicCard>
                        ))
                )
            }
        </Stack>
  )

}
