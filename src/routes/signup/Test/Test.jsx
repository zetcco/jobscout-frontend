import { Grid } from '@mui/material'
import React from 'react'
import { EducationalCard } from '../../../components/profile/education/EducationalCard'
import EducationQualificationForm from '../../../components/authentication/EducationQualificationForm'
import { OrganizationProfileCreation } from '../organization/OrganizationProfileCreation'


export const Test = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          
          <EducationQualificationForm />
          
        </Grid>
      </Grid>
    )
  }