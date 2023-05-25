import { OpenInFullTwoTone } from '@mui/icons-material'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ResponsiveIconButton } from 'components/ResponsiveIconButton'
import { BasicCard } from 'components/cards/BasicCard'
import { selectAuthUserId } from 'features/authSlice'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Employees = () => {

    const [ loading, setLoading ] = useState(false)
    const [ users, setUsers ] = useState([])
    const userId = useSelector(selectAuthUserId)
    const fetch = useFetch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            await fetch(`/organization/${userId}/employees`, "GET", { onSuccess: setUsers })
            setLoading(false)
        }
        fetchDetails()
    }, [])

    return (
      <Stack direction={'column'} spacing={2} justifyContent={'center'} sx={{ width: '100%' }}>
          <Typography variant='h4'>Employees</Typography>
          {
              loading ? (
                <CircularProgress/>
              ) : (
              users.length === 0 ? (
                  <Typography variant='h6'>No employees yet..</Typography>
              ): (
                  users.map(
                      (user, index) => (
                          <BasicCard divsx={{ width: '100%' }} key={index}>
                              <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} justifyContent={'space-between'} alignItems={'center'}>
                                  <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                                      <AvatarWithInitials size={{ xs: 60, md: 70 }} src={user.displayPicture} name={user.displayName}/>
                                      <Stack direction={'column'} spacing={0.2}>
                                          <Typography variant='h5' fontWeight={600}>{ user.displayName }</Typography>
                                          <Typography fontSize={16}>{ user.email }</Typography> 
                                      </Stack>                      
                                  </Stack>
                                <Stack direction={'row'} spacing={1}>
                                    <ResponsiveIconButton onClick={() => { navigate(`/users/${user.id}`) }} startIcon={<OpenInFullTwoTone/>}>View Profile</ResponsiveIconButton>
                                </Stack>
                              </Stack>
                          </BasicCard>
                      ))
              ))
          }
      </Stack>
    )
}
