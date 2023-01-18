import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'
import { DashedArea } from '../input/DashedArea'

export const OrganizationProfileCreationForm = () => {
  return (
    <CenteredHeaderCard
        title={"Create your Profile"} 
        footer={<Button variant='contained' sx={{ width: '100%' }}>Continue</Button>}
    >
        <Stack spacing={2} sx={{ width: '100%' }}>
            <TextField label="Outlined" variant="outlined"/>
            <DashedArea text={"Click here to Upload Logo"}/>
        </Stack>
    </CenteredHeaderCard>
  )
}
