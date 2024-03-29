import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'
import { SelectableCard } from '../cards/SelectableCard'
import { Link as RounterLink } from 'react-router-dom'

export const AccountTypeSelectionForm = () => {
    const [ selected, setSelected ] = useState(null)

    return (
            <CenteredHeaderCard 
                title={"Select Account Type"}
                footer={<Button component={RounterLink} disabled={selected === null} to={ selected === "Organization" ? "/signup/organization/account" : ( selected === "Job Seeker" ) ? "/signup/user/seeker/account" : "/signup/user/creator/account"} variant='contained' sx={{ width: '100%' }}>Continue</Button>}
            >
                <Stack direction={{ sm: "column", lg: "row" }} spacing={2} sx={{  width: '100%' }} alignItems={{ lg: 'stretch' }}>
                    <Box sx={{ flex: 1 }}>
                        <SelectableCard divsx={{ height: '100%' }} sx={{ height: '100%' }} onClick={() => setSelected("Job Seeker")} selected={selected === "Job Seeker" ? true : undefined}>
                            <Typography variant={ selected === "Job Seeker" ? "body3" : undefined}>Job Seeker</Typography>
                        </SelectableCard>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <SelectableCard divsx={{ height: '100%' }} sx={{ height: '100%' }} onClick={() => setSelected("Job Creator")} selected={selected === "Job Creator" ? true : undefined}>
                            <Typography variant={ selected === "Job Creator" ? "body3" : undefined}>Job Creator</Typography>
                        </SelectableCard>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <SelectableCard divsx={{ height: '100%' }} sx={{ height: '100%' }} onClick={() => setSelected("Organization")} selected={selected === "Organization" ? true : undefined}>
                            <Typography variant={ selected === "Organization" ? "body3" : undefined}>Organization</Typography>
                        </SelectableCard>
                    </Box>
                </Stack>
            </CenteredHeaderCard>
    )
}
