import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { AvatarWithInitials } from 'components/AvatarWithInitials';
import { ResponsiveIconButton } from 'components/ResponsiveIconButton';
import { BasicCard } from 'components/cards/BasicCard';
import { useFetch } from 'hooks/useFetch';
import React, { useEffect, useState } from 'react'

export const JoinRequest = () => {
  const [requesters, setRequesters] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetch = useFetch()

  const acceptReq = async (id) =>{
    fetch(`organization/accept-request?requester=${id}`, "POST", { successMsg: "Request Accepted", onSuccess: () => {
      setRequesters(e => e.filter(el => el.id !== id))
    } })
  }

  const rejectReq = async (id) =>{
    fetch(`organization/reject-request?requester=${id}`, "DELETE", { successMsg: "Request Rejected", onSuccess: () => {
      setRequesters(e => e.filter(el => el.id !== id))
    } })
  }

  const fetchRequests = async () =>{
    setLoading(true)
    await fetch('organization/join-request', "GET", { onSuccess: setRequesters })
    setLoading(false)
  }

  useEffect(() =>{
    fetchRequests()
  },[])

  return (
      <Stack direction={'column'} spacing={2} justifyContent={'center'} sx={{ width: '100%' }}>
          {
              loading ? (
                <CircularProgress/>
              ) : (
              requesters.length === 0 ? (
                  <Typography variant='h6'>No requests yet..</Typography>
              ): (
                  requesters.map(
                      (requester, index) => (
                          <BasicCard divsx={{ width: '100%' }} key={index}>
                              <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} justifyContent={'space-between'} alignItems={'center'}>
                                  <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                                      <AvatarWithInitials size={{ xs: 60, md: 70 }} src={requester.displayPicture} name={requester.displayName}/>
                                      <Stack direction={'column'} spacing={0.2}>
                                          <Typography variant='h5' fontWeight={600}>{ requester.displayName }</Typography>
                                          <Typography fontSize={16}>{ requester.email }</Typography> 
                                      </Stack>                      
                                  </Stack>
                                  <Stack direction={'row'} spacing={1}>
                                      <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>} onClick={() => { rejectReq(requester.id) }}>Reject</ResponsiveIconButton>
                                      <ResponsiveIconButton onClick={() => { acceptReq(requester.id) }} startIcon={<AddCircleOutline/>}>Accept</ResponsiveIconButton>
                                  </Stack>
                              </Stack>
                          </BasicCard>
                      ))
              ))
          }
      </Stack>
  )
}
export default JoinRequest
