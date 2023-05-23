import { EditRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

export const EditIcon = ({ onClick }) => {
    return (
        <>
            <IconButton color='primary' sx={{
                width: 8,
                height: 8,
                ml: 1.5
            }}
            onClick={onClick}
            >
                <EditRounded sx={{
                    width: 20,
                    height: 20
                }}/>
            </IconButton>
        </>
  )
}
