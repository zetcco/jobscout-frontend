import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { BasicCard } from '../BasicCard'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'

export const AccountTypeSelectionForm = () => {
  return (
        <CenteredHeaderCard 
            title={"Select Account Type"}
            footer={<Button variant='contained' sx={{ width: '100%' }}>Continue</Button>}
        >
            <Box sx={{ px: { sm: 4 } }}>
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
            </Box>
        </CenteredHeaderCard>
  )
}
