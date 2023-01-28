import { Grid } from '@mui/material'
import React from 'react'
import CreatorSignupForm from '../../../../components/authentication/user/job_creator/CreatorSignupForm'

export const CreatorSignup = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CreatorSignupForm/>
      </Grid>
    </Grid>  
  )
}
