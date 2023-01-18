import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { BasicCard } from '../BasicCard'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'

export const AccountTypeSelectionForm = () => {
  return (
        <CenteredHeaderCard 
            title={"Select Account Type"}
            footer={<Button sx={{ width: '100%' }}>Continue</Button>}
        >
            <Stack direction="row" spacing={2} >
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
        </CenteredHeaderCard>
  )
}
