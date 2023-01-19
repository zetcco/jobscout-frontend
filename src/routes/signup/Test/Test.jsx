import { Grid } from '@mui/material'
import React from 'react'
import { JobSeekerProfileCreation } from '../../../components/authentication/JobSeekerProfileCreation'
import { UploadProfilePictureForm } from '../../../components/authentication/UploadProfilePictureForm'


export const Test = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <JobSeekerProfileCreation />
        </Grid>
      </Grid>
    )
  }