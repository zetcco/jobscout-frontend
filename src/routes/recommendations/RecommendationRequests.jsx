import RecommendationRequests from 'components/recommendation/RecommendationRequests'
import { Stack } from '@mui/system'
import React from 'react'
import { Typography } from '@mui/material'

function RecommendationRequestsPage() {
  return (
    <Stack direction={'column'} spacing={4}>
      <Typography variant='h4'>Recommendations</Typography>
      <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={5}>
          <Stack spacing={3}>
            <RecommendationRequests />
          </Stack>
        </Stack>
    </Stack>
  )
}

export default RecommendationRequestsPage
