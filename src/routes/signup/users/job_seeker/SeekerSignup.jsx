import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import SeekerSignupForm from '../../../../components/authentication/user/job_seeker/SeekerSignupForm'
import { selectAccountEnabled } from '../../../../features/authSlice';

export const SeekerSignup = () => {
  const accEnabled = useSelector(selectAccountEnabled);

  if (accEnabled === false)
      return (<Navigate to={"/login"} replace/>)


  return (
    <Grid container>
      <Grid item xs={12}>
        <SeekerSignupForm/>
      </Grid>
    </Grid>  
  )
}
