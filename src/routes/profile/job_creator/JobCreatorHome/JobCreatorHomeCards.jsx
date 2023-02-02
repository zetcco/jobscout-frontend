import React from 'react'
import { BasicCard } from '../../../../components/cards/BasicCard'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

export const JobCreatorHomeCards = ({title , subtitle , count , color}) => {
  return (
    <BasicCard>
        <Stack direction = {'column'} spacing = {1} >
            {title && <Typography variant='h6'>{title}</Typography>}
            <Stack direction={'row'} justifyContent = 'space-between' alignItems = 'center'>
                { subtitle && <Typography variant='overline'>{ subtitle }</Typography>}
                { count && <Typography variant='h1' sx = {{color : {color}}}>{ count }</Typography>}
            </Stack>
        </Stack>
    </BasicCard>
  )
}
