import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard'
import { DashedArea } from '../input/DashedArea'
import { EducationalCard } from '../profile/education/EducationalCard'

export const EducationQualificationForm = () => {
  return (
    <CenteredHeaderCard
        title={" Add Educational Qualifications"} 
        footer={
            <Stack direction="row" spacing={2}>
                <Button variant='outlined' sx={{ width: '100%' }}>Go Back</Button>
                <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
            </Stack>
        }
    >
        <Stack spacing={2} sx={{ width: '100%' }}>
            
            <DashedArea text={"Click to Add Educational Qualifications "}/>
            <EducationalCard />
            <EducationalCard />

        </Stack>
    </CenteredHeaderCard>
  )
}

export default EducationQualificationForm
