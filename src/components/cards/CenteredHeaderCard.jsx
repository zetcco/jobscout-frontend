import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { BasicCard } from '../BasicCard'

export const CenteredHeaderCard = ({ title, footer, children, icon }) => {
  return (
    <BasicCard>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ px: 5 }}
      >
        { icon !== null && icon }
        <Typography variant="h5">{ title }</Typography>
        { children }
        <Box sx={{ width: "100%" }}>
            { footer !== null && footer }
        </Box>
      </Stack>
    </BasicCard>
  );
}
