import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'




const AddCompanyForm = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <CenteredHeaderCard
        title={" Add Your Company"} 
        footer={
            <Stack direction="row" spacing={2}>
                <Button variant='outlined' sx={{ width: '100%' }}> Create New </Button>
                <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
            </Stack>
      }>
            
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TextField id="outlined-basic" label="Search Your Company" variant="outlined" />
      </Stack>
      
      </CenteredHeaderCard>
    
    </Stack>
  )
}

export default AddCompanyForm
