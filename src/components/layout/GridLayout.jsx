import { motion } from "framer-motion"
import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const GridLayout = () => {

  const { pathname } = useLocation();
  let largeSize = '250px';

  if (pathname === '/login')
    largeSize = '450px';

  return (
    <Box sx={{ mx: { md: '200px', lg: largeSize } }}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
      <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ minHeight: '100vh' }}
      >
          <Outlet/>
      </Grid>
      </motion.div>
    </Box>
  )
}
