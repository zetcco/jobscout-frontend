import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { BasicCard } from './BasicCard'

export const CenteredHeaderCard = ({ title, footer, children, icon, glassEffect }) => {
  return (
    <BasicCard glassEffect={glassEffect}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ px: { sm: 4, md: 7 } }}
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

CenteredHeaderCard.defaultProps = {
  glassEffect: true
}