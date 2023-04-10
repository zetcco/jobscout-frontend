import { Subtitles } from '@mui/icons-material'
import { Button, FormHelperText, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { RouterLink } from 'components/RouterLink'
import { BasicCard } from 'components/cards/BasicCard'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const ProfileHeaderWithNameEmail = ({id, name, email, src}) => {

    const [ deleteRequest, setDeleteRequest ] = useState(null);
    const authToken = useSelector(selectAuthUserToken);

    console.log(authToken)

    const onClick = async () => {
        const response = await axios.delete(
            '/recommendations/deleterequest',
            { "requesterId": id },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log(response)
    }

  return (
    <BasicCard>
        <Stack direction={'row'} spacing={10}  justifyContent="space-between" >
            <Stack 
                direction={'row'} 
                spacing = {1}
                alignItems={'center'}
            >
                <AvatarWithInitials src={src} name={name} size={100}/>
                <Stack direction={'column'} spacing={0.1}>
                    <Typography variant='h4'>{ name }</Typography>
                    <Typography variant='h6'>{ email }</Typography>
                </Stack>
            </Stack>
            <Stack direction={'column'} spacing = {1.5}  justifyContent={'center'}>
            <RouterLink to={"/manage/recommendation/" +id}>
                <Button variant = "outlined">Recommendation</Button>
            </RouterLink>
            <Button variant = "outlined" onClick={() => onClick(id)}>Delete</Button>
        </Stack> 
        </Stack>
    </BasicCard>
  )
}
