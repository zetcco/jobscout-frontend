import { Alert, AlertTitle, Button, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import axios from 'axios'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import { RouterLink } from 'components/RouterLink'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const Intro = () => {

    const [ intro, setIntro ] = useState('');
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const authToken = useSelector(selectAuthUserToken)
    const navigate = useNavigate()

    const updateIntro = async () => {
        try {
            setLoading(true)
            const data = await axios.put('/job-seeker/update/intro', intro, { headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "text/plain" } })
            if (data.status === 200)
                navigate('/signup/user/dp')
        } catch (error) {
            setError(error.response.data)
        }
        setLoading(false)
    }

    return (
        <CenteredHeaderCard
            title={"Express yourself"}
            footer={
                <Stack direction="row" spacing={2}>
                    <Box sx={{ width: '100%' }}>
                    <RouterLink to="/signup/user/seeker/profile/qualification">
                        <Button variant='outlined' sx={{ width: '100%' }}>Back</Button>
                    </RouterLink>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                    <RouterLink to="/signup/user/seeker/profile/intro">
                        <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                    </RouterLink>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                    <Button variant='contained' sx={{ width: '100%' }} onClick={updateIntro} disabled={intro === '' || loading}>Continue</Button>
                    </Box>
                </Stack>
            }
        >
        <Stack spacing={2} sx={{ width: { xs: '100%' } }}>
        {
            error && 
            (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.message}</strong>
                </Alert>
            )
        }
        <TextField
            sx={{ width: { xs: '90vw', md: '40vw' } }}
            label='Introduction'
            multiline
            value={intro}
            onChange={(e) => { setIntro(e.target.value) }}
            rows={8}
        />
        </Stack>
        </CenteredHeaderCard>
  )
}
