import { Grid } from '@mui/material'
import React from 'react'
import OrganizationSignupForm from '../../../components/authentication/organization/OrganizationSignupForm'

export const OrganizationSignup = () => {
  return (
     <Grid container>
      <Grid item xs={12}>
        <OrganizationSignupForm/>
      </Grid>
    </Grid>  
  )
}
