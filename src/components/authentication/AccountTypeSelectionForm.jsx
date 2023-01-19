import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BasicCard } from '../BasicCard'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'
import { SelectableCard } from '../cards/SelectableCard'

export const AccountTypeSelectionForm = () => {
    const [ selected, setSelected ] = useState()

    return (
            <CenteredHeaderCard 
                title={"Select Account Type"}
                footer={<Button variant='contained' sx={{ width: '100%' }}>Continue</Button>}
            >
                <Stack direction="row" spacing={2} sx={{  width: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <SelectableCard title={"Job Seeker"} onClick={() => setSelected("Job Seeker")} selected={selected === "Job Seeker" ? true : undefined}/>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <SelectableCard title={"Job Creator"} onClick={() => setSelected("Job Creator")} selected={selected === "Job Creator" ? true : undefined}/>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <SelectableCard title={"Organization"} onClick={() => setSelected("Organization")} selected={selected === "Organization" ? true : undefined}/>
                    </Box>
                </Stack>
            </CenteredHeaderCard>
    )
}
