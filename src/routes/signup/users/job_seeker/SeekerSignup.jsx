import { Grid } from '@mui/material'
import React from 'react'
import SeekerSignupForm from '../../../../components/authentication/user/job_seeker/SeekerSignupForm'

export const SeekerSignup = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SeekerSignupForm/>
      </Grid>
    </Grid>  
  )
}
