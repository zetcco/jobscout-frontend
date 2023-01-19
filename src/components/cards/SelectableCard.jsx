import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from '../BasicCard'

export const SelectableCard = ({ title, selected, onClick, sx }) => {
  return (
    <BasicCard sx={{
        cursor: 'pointer',
        ...( selected === false && {
            "&:hover": {
                borderColor: (theme) => theme.palette.primary.light,
            }
        }),
        ...(selected !== false && { 
            borderColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.dark,
            backgroundColor: (theme) => theme.palette.primary.fade
        }),
        ...sx
    }}
    onClick={onClick}
    >
        <Stack direction={"column"} alignItems={"center"}>
            <Box></Box>
            <Typography variant={ selected ? "body3" : undefined}>{ title }</Typography>
        </Stack>
    </BasicCard>
  )
}

SelectableCard.defaultProps = {
    selected: false
}
