import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'

export const OrganizationProfileCreationForm = () => {
  return (
    <CenteredHeaderCard
        title={"Create your Profile"} 
        footer={<Button sx={{ width: '100%' }}>Continue</Button>}
        icon={<Typography>X</Typography>}
    >
        <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
        <Box width={'100%'} height={25} sx={{ backgroundColor: '#f00' }}>
        </Box>
    </CenteredHeaderCard>
  )
}
