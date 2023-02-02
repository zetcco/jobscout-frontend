import React from 'react'
import { BasicCard } from '../../../../components/cards/BasicCard'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

export const JobCreatorHomeCards = ({title , count , color}) => {
  return (
    <BasicCard>
        <Stack direction={'row'} justifyContent = 'space-between' alignItems = 'center'>
            {title && <Typography variant='h4'>{ title }</Typography>}
            {count && <Typography variant='h1' sx = {{color : {color}}}>{ count }</Typography>}
        </Stack>
    </BasicCard>
  )
}
