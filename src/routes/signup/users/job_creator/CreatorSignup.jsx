import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CreatorSignupForm from '../../../../components/authentication/user/job_creator/CreatorSignupForm'
import { selectAuthUser } from '../../../../features/authSlice';

export const CreatorSignup = () => {
  const authUser = useSelector(selectAuthUser);

  if (authUser)
      return (<Navigate to={"/signup/user/creator/profile/company"} replace/>)

  return (
    <Grid container>
      <Grid item xs={12}>
        <CreatorSignupForm/>
      </Grid>
    </Grid>  
  )
}
