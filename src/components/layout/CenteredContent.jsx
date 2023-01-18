import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const CenteredContent = () => {
  return (
    <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ height: '100vh' }}
    >
        <Outlet/>
    </Grid>
  )
}
