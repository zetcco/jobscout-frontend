import { Grid , Stack , Button} from '@mui/material'
import React from 'react'
import SmallPanel from '../../SmallPanel'
import { JobApplication } from './JobApplication'


export const ManageJobPost = () => {
  return (
    <Stack direction={'row'} spacing={2}>
                <Stack spacing={2}>
                  <JobApplication />
                  <JobApplication />
                  <JobApplication />
                  <JobApplication />
                </Stack>
                <Stack>
                  <SmallPanel children={'children'}>
                           <Button variant="outlined">Button</Button>
                   </SmallPanel>
                </Stack>

    </Stack>

        )
}
