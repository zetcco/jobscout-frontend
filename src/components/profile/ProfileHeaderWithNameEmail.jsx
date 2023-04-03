import { Subtitles } from '@mui/icons-material'
import { FormHelperText, Stack, Typography } from '@mui/material'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { BasicCard } from 'components/cards/BasicCard'
import React from 'react'

export const ProfileHeaderWithNameEmail = ({name, email, src, sx}) => {
  return (
    <BasicCard>
        <Stack direction={'column'} spacing={2} sx={sx}>
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
        </Stack>
    </BasicCard>
  )
}
