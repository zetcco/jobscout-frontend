import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import { CodeSpace } from 'components/coding/CodeSpace'
import React from 'react'

export const CodingInterview = () => {

    const { mixins: { toolbar } } = useTheme()

    return (
        <Box height={`calc(100vh - (${toolbar?.minHeight}px + ${20}px))`}>
            <CodeSpace/>
        </Box>
    )
}