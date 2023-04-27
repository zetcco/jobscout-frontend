import RecommendationRequests from 'components/recommendation/RecommendationRequests'
import { Stack } from '@mui/system'
import React from 'react'

function RecommendationRequestsPage() {
  return (
    <div>
      <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={5}>
          <Stack spacing={3}>
            <RecommendationRequests />
          </Stack>
        </Stack>
    </div>
  )
}

export default RecommendationRequestsPage
