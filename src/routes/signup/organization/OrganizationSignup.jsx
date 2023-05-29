import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import OrganizationSignupForm from '../../../components/authentication/organization/OrganizationSignupForm'
import { selectAccountEnabled } from '../../../features/authSlice';

export const OrganizationSignup = () => {
  const accEnabled = useSelector(selectAccountEnabled);

  if (accEnabled === false)
      return (<Navigate to={"/login"} replace/>)

  return (
     <Grid container>
      <Grid item xs={12}>
        <OrganizationSignupForm/>
      </Grid>
    </Grid>  
  )
}
