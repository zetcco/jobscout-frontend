import { Grid } from '@mui/material'
import React from 'react'
import UserSignupForm from '../../../components/authentication/user/UserSignupForm'

export const UserSignup = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <UserSignupForm/>
      </Grid>
    </Grid>  
  )
}
