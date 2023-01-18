import { Stack, Typography } from '@mui/material'
import React from 'react'
import { BasicCard } from '../BasicCard'

export const AccountTypeSelectionForm = () => {
  return (
    <BasicCard>
        <Stack
            direction="row"
        >
            <BasicCard>
                <Typography>Job Seeker</Typography>
            </BasicCard>
            <BasicCard>
                <Typography>Job Creator</Typography>
            </BasicCard>
            <BasicCard>
                <Typography>Organization</Typography>
            </BasicCard>
        </Stack>
    </BasicCard>
  )
}
