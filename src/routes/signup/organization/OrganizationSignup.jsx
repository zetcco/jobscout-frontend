import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import OrganizationSignupForm from '../../../components/authentication/organization/OrganizationSignupForm'
import { selectAuthUser } from '../../../features/authSlice';

export const OrganizationSignup = () => {
  const authUser = useSelector(selectAuthUser);

  if (authUser)
      return (<Navigate to={"/signup/organization/profile"} replace/>)

  return (
     <Grid container>
      <Grid item xs={12}>
        <OrganizationSignupForm/>
      </Grid>
    </Grid>  
  )
}
