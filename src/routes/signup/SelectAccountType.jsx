import { Grid } from '@mui/material'
import React from 'react'
import { AccountTypeSelectionForm } from '../../components/authentication/AccountTypeSelectionForm'

export const SelectAccountType = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AccountTypeSelectionForm/>
      </Grid>
    </Grid>
  )
}
