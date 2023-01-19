import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const GridLayout = () => {
  return (
    <Box sx={{ mx: { md: '200px', lg: '350px' } }}>
      <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: '100vh' }}
      >
          <Outlet/>
      </Grid>
    </Box>
  )
}
