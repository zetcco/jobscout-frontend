import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

export const DashedArea = ({ text, icon }) => {
  return (
    <Box
        sx={{
            borderStyle: 'dashed',
            borderWidth: 2,
            borderRadius: (theme) => theme.shape.borderRadius / 500,
            borderColor: (theme) => theme.palette.primary.main,
            padding: 5
        }}
    >
        <Stack
            direction={"column"} 
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            sx={{ color: (theme) => theme.palette.primary.main }}
        >
            { icon !== null && icon }
            <Typography variant='button' align='center'>{ text }</Typography>
        </Stack>
    </Box>
  )
}
