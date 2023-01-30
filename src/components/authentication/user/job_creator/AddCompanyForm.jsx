import { Button, TextField, Box, InputAdornment } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import SearchIcon from '@mui/icons-material/Search';
import { RouterLink } from '../../../RouterLink';




const AddCompanyForm = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <CenteredHeaderCard
        title={" Add Your Company"} 
        footer={
          <Stack direction="row" spacing={2}>
          <Box sx={{ width: '100%' }}>
            <RouterLink to="/signup/organization/account">
              <Button variant='outlined' sx={{ width: '100%' }}>Create Your Company</Button>
            </RouterLink>
          </Box>
          <Box sx={{ width: '100%' }}>
            <RouterLink to="/signup/user/dp">
              <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
            </RouterLink>
          </Box>
      </Stack>     
                
            
      }>
            
      
        <Stack spacing={2} sx={{ width: '100%' }}>

        <TextField
          id="input-with-icon-textfield"
          label="Search Your Company"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        </Stack>
      
      </CenteredHeaderCard>
    
    </Stack>
  )
}

export default AddCompanyForm
