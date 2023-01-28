import { Grid } from '@mui/material'
import React from 'react'
import { AddSkillsForm } from '../../../../components/authentication/user/job_seeker/AddSkillsForm'

export const AddSkills = () => {
  return (
     <Grid container>
      <Grid item xs={12}>
        <AddSkillsForm/>
      </Grid>
    </Grid>  
  )
}
