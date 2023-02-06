import React from 'react'
import { BasicCard } from '../../../../components/cards/BasicCard'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

export const JobCreatorHomeCards = ({title , subtitle , count}) => {
  return (
    <BasicCard>
        <Stack direction = {'column'} spacing = {1} >
            {title && <Typography variant='h6'>{title}</Typography>}
            <Stack direction={'row'} justifyContent = 'space-between' alignItems = 'center'>
                { subtitle && <Typography variant='subtitle'>{ subtitle }</Typography>}
                { count && <Typography variant='h2'>{ count }</Typography>}
            </Stack>
        </Stack>
    </BasicCard>
  )
}
