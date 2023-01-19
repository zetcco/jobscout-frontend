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
            <Stack direction="row" spacing={2} sx={{  width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <BasicCard>
                        <Typography>Job Seeker</Typography>
                    </BasicCard>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <BasicCard>
                        <Typography>Job Creator</Typography>
                    </BasicCard>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <BasicCard>
                        <Typography>Organization</Typography>
                    </BasicCard>
                </Box>
            </Stack>
        </CenteredHeaderCard>
  )
}
