import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AccountTypeSelectionForm } from '../../components/authentication/AccountTypeSelectionForm'
import { selectAuthUser } from '../../features/authSlice';

export const SelectAccountType = () => {
    const authUser = useSelector(selectAuthUser);

    if (authUser)
        return (<Navigate to={"/home"} replace/>)
  return (
    <Grid container>
      <Grid item xs={12}>
        <AccountTypeSelectionForm/>
      </Grid>
    </Grid>
  )
}
