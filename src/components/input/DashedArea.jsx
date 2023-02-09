import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

export const DashedArea = ({ text, icon, onClick, error }) => {
  return (
    <Box
        sx={{
            cursor: 'pointer',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderRadius: (theme) => theme.shape.borderRadius / 500,
            borderColor: (error ? ((theme) => theme.palette.error.main) : ((theme) => theme.palette.primary.main)),
            padding: 5
        }}

        onClick={onClick}
    >
        <Stack
            direction={"column"} 
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            sx={{ color: (error ? ((theme) => theme.palette.error.main) : ((theme) => theme.palette.primary.main)) }}
        >
            { icon !== null && icon }
            <Typography variant='button' align='center'>{ text }</Typography>
        </Stack>
    </Box>
  )
}
