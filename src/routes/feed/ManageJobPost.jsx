import { Stack } from '@mui/system'
import {Button} from '@mui/material'
import React from 'react'
import ManageJobPostFrom from '../../components/job_postings/ManageJobPostFrom'
import SmallPanel from '../../components/SmallPanel'

function ManageJobPost() {
  return (
    <>
        <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={5}>
          <Stack spacing={3}>
            <ManageJobPostFrom />
            <ManageJobPostFrom />
            <ManageJobPostFrom />
          </Stack>
          <Stack>
            <SmallPanel>
              <Button variant = "outlined">Button</Button>
            </SmallPanel>
          </Stack>
        </Stack>
    </>
  )
}
export default ManageJobPost






