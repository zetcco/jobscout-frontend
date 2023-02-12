import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { OrganizationProfileCreationForm } from '../../../components/authentication/organization/OrganizationProfileCreationForm'
import { selectAuthUser } from '../../../features/authSlice';

export const OrganizationProfileCreation = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <OrganizationProfileCreationForm/>
      </Grid>
    </Grid>
  )
}
