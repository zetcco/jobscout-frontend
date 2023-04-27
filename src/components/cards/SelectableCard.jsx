import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from './BasicCard'

export const SelectableCard = ({ children, selected, onClick, sx, padding, onMouseEnter, onMouseLeave, divsx }) => {
  return (
    <BasicCard sx={{
        cursor: 'pointer',
        ...( selected === false && {
            transition: (theme) => theme.transitions.create(['border-color', 'box-shadow'], {
                duration: theme.transitions.duration.standard
            }),
            "&:hover": {
                borderColor: (theme) => theme.palette.primary.light,
                boxShadow: '0px 9px 21px 4px rgba(0,174,43,0.16)',
            }
        }),
        ...(selected !== false && { 
            transition: (theme) => theme.transitions.create(['border-color', 'background-color'], {
                duration: theme.transitions.duration.standard
            }),
            borderColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.dark,
            backgroundColor: (theme) => theme.palette.primary.fade,
            boxShadow: '0px 9px 21px 4px rgba(0,174,43,0.16)',
        }),
        ...sx
    }}
    divsx={{ ...divsx }}
    padding={padding}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    >
        <Stack direction={"column"} alignItems={"center"}>
            { children }
        </Stack>
    </BasicCard>
  )
}

SelectableCard.defaultProps = {
    selected: false
}
