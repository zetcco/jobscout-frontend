import { Grid } from '@mui/material'
import React from 'react'
import SignupForm from '../../../components/authentication/SignupForm'

export const UserSignup = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SignupForm/>
      </Grid>
    </Grid>  
  )
}
