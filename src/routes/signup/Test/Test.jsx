import { Grid } from '@mui/material'
import React from 'react'
import { EducationalCard } from '../../../components/profile/education/EducationalCard'


export const Test = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <EducationalCard />
        </Grid>
      </Grid>
    )
  }