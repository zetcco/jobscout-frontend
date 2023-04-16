import { Button, Stack, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const QuestionaryResults = ({ id, results }) => {

    const navigate = useNavigate()

    return (
        <BasicCard>
        <Stack direction={'column'} spacing={2}>
            { results >= 70 ? <Typography variant='h5'><strong>Congratulations!</strong></Typography> : <Typography variant='h5'><strong>You have failed</strong></Typography>}
            <Typography>You have scored <strong>{results}</strong> marks</Typography>
            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
            <Button variant='outlined' onClick={ () => { navigate(`/questionaries`) }} sx={{ width: '100%' }}>Retry</Button>
            <Button variant='contained' sx={{ width: '100%' }}>Add to Profile</Button>
            </Stack>
        </Stack>
        </BasicCard>
    )
}
