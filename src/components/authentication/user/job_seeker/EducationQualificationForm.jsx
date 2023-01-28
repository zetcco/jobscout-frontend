import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { DashedArea } from '../../../input/DashedArea'
import { EducationalCard } from '../../../profile/education/EducationalCard'
import UploadIcon from '@mui/icons-material/Upload';

export const EducationQualificationForm = () => {
  return (
    <CenteredHeaderCard
        title={" Add Educational Qualifications"} 
        footer={
            <Stack direction="row" spacing={2}>
                <Button variant='outlined' sx={{ width: '100%' }}>Go Back</Button>
                <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
            </Stack>
        }>
        <Stack spacing={2} sx={{ width: '100%' }}>
                <DashedArea
              
                    text = {'Click to Add Educational Qualifications'}
                    icon = {<UploadIcon fontSize="large"/>}
                 /> 
            <EducationalCard DegreeName={"Bachelor of Computer Science"} Institution={"University of Ruhuna"} Duration={"2019 - 2023"}/>
            <EducationalCard DegreeName={"Bachelor of Computer Science"} Institution={"University of Ruhuna"} Duration={"2019 - 2023"}/>
        </Stack>
    </CenteredHeaderCard>
  )
}

export default EducationQualificationForm
