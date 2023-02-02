import {Typography ,Button} from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'

function ManageJobPostFrom() {
  return (
    <>
        <BasicCard>
            <Stack spacing = {2} >
                <Stack direction="colomn" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                                <ProfileHeaderCard name={'Indrajith Madhumal'} /> 
                        </Stack>
                        <Stack alignItems={'flex-start'}>
                            <Typography>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant = "outlined">Accept</Button>
                        <Button variant = "outlined">Reject</Button>
                    </Stack>
                </Stack>
            </Stack>
        </BasicCard>
    </>
  )
}
export default ManageJobPostFrom