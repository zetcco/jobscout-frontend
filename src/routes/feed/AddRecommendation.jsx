import AddRecommendationFrom from 'components/job_postings/AddRecommendationFrom'
import { Stack } from '@mui/system'
import {Button} from '@mui/material'
import React from 'react'
import SmallPanel from '../../components/SmallPanel'

function AddRecommendation() {
  return (
    <div>
      <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={5}>
          <Stack spacing={3}>
            <AddRecommendationFrom />
          </Stack>
        </Stack>
    </div>
  )
}

export default AddRecommendation
