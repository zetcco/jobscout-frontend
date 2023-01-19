import { Grid } from '@mui/material'
import React from 'react'
import { OrganizationProfileCreationForm } from '../../../components/authentication/OrganizationProfileCreationForm'

export const OrganizationSignup = () => {
  return (
     <Grid container>
      <Grid item xs={12}>
        <OrganizationProfileCreationForm/>
      </Grid>
    </Grid>  
  )
}
