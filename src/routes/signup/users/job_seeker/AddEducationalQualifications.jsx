import { Grid } from '@mui/material'
import React from 'react'
import EducationQualificationForm from '../../../../components/authentication/user/job_seeker/EducationQualificationForm'

export const AddEducationalQualifications = () => {
  return (
     <Grid container>
      <Grid item xs={12}>
        <EducationQualificationForm/>
      </Grid>
    </Grid>  
  )
}
