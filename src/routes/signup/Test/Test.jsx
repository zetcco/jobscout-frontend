import { Grid } from '@mui/material'
import React from 'react'
import EducationQualificationForm from '../../../components/authentication/EducationQualificationForm'

export const Test = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <EducationQualificationForm />
        </Grid>
      </Grid>
    )
  }