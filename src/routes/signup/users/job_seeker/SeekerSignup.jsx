import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import SeekerSignupForm from '../../../../components/authentication/user/job_seeker/SeekerSignupForm'
import { selectAuthUser } from '../../../../features/authSlice';

export const SeekerSignup = () => {
  const authUser = useSelector(selectAuthUser);

  if (authUser)
      return (<Navigate to={"/signup/user/seeker/profile/skills"} replace/>)

  return (
    <Grid container>
      <Grid item xs={12}>
        <SeekerSignupForm/>
      </Grid>
    </Grid>  
  )
}
