import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import { serverClient } from 'features/authSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const QuestionaryResults = ({ id, results, onSubmit, submitText }) => {

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    return (
        <BasicCard>
        <Stack direction={'column'} spacing={2}>
            { results >= 70 ? <Typography variant='h5'><strong>Congratulations!</strong></Typography> : <Typography variant='h5'><strong>You have failed</strong></Typography>}
            <Typography>You have scored <strong>{results}</strong> marks</Typography>
            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
            <Button variant='outlined' onClick={ () => { navigate(`/questionaries`) }} sx={{ width: '100%' }}>Retry</Button>
            { results >= 70 && <Button variant='contained' sx={{ width: '100%' }} disabled={loading} onClick={onSubmit}>{ loading ? <CircularProgress/> : submitText }</Button> }
            </Stack>
        </Stack>
        </BasicCard>
    )
}

const addToProfile = async (questionaryId) => {
}