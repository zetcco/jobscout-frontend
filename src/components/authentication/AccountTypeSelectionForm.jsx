import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'
import { SelectableCard } from '../cards/SelectableCard'
import { Link as RounterLink } from 'react-router-dom'

export const AccountTypeSelectionForm = () => {
    const [ selected, setSelected ] = useState()

    return (
            <CenteredHeaderCard 
                title={"Select Account Type"}
                footer={<Button component={RounterLink} to={ selected === "Organization" ? "/signup/organization/account" : "/signup/user/account"} variant='contained' sx={{ width: '100%' }}>Continue</Button>}
            >
                <Stack direction={{ sm: "column", lg: "row" }} spacing={2} sx={{  width: '100%' }} alignItems="stretch">
                    <SelectableCard sx={{ width: '100%' }} title={"Job Seeker"} onClick={() => setSelected("Job Seeker")} selected={selected === "Job Seeker" ? true : undefined}/>
                    <SelectableCard sx={{ width: '100%' }} title={"Job Creator"} onClick={() => setSelected("Job Creator")} selected={selected === "Job Creator" ? true : undefined}/>
                    <SelectableCard sx={{ width: '100%' }} title={"Organization"} onClick={() => setSelected("Organization")} selected={selected === "Organization" ? true : undefined}/>
                </Stack>
            </CenteredHeaderCard>
    )
}
