import { Button, TextField, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import SearchIcon from '@mui/icons-material/Search';




const AddCompanyForm = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <CenteredHeaderCard
        title={" Add Your Company"} 
        footer={
            <Stack direction="row" spacing={2}>
                
                  <Button variant='outlined' sx={{ width: '100%' }}> Create Your Company Profile </Button>
                              
                  <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
                
                
            </Stack>
      }>
            
      
        <Stack spacing={2} sx={{ width: '100%' }}> 
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon fontSize='large' />
            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Search Your Company" variant="outlined" />
          </Box>
        </Stack>
      
      </CenteredHeaderCard>
    
    </Stack>
  )
}

export default AddCompanyForm
