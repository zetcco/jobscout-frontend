import { Grid } from '@mui/material'
import React from 'react'
import { UploadProfilePictureForm } from '../../../components/authentication/UploadProfilePictureForm'

export const UploadProfilePicture = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <UploadProfilePictureForm/>
        </Grid>
      </Grid>
    )
  }