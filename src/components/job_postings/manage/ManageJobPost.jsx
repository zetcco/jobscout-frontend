import { Grid , Stack } from '@mui/material'
import React from 'react'
import { JobApplication } from './JobApplication'

export const ManageJobPost = () => {
  return (
    <Stack spacing={2}>
      <JobApplication />
      <JobApplication />
      <JobApplication />
      <JobApplication />
    </Stack>
      

        )
}
