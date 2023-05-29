import { Alert, AlertTitle, Button, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import axios from 'axios'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import { RouterLink } from 'components/RouterLink'
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice'
import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const Intro = forwardRef(({ onUpdate, onCancel }, ref) => {

    const [ intro, setIntro ] = useState('');
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const authToken = useSelector(selectAuthUserToken)
    const authUser = useSelector(selectAuthUser)
    const navigate = useNavigate()

    const updateIntro = async () => {
        try {
            setLoading(true)
            const data = await axios.put('/job-seeker/update/intro', intro, { headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "text/plain" } })
            if (data.status === 200)
                if (onUpdate) onUpdate(data.data) 
                else navigate('/signup/user/dp')
        } catch (error) {
            setError(error.response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        const fetchExisting = async () => {
            setLoading(true)
            const response = await axios.get(`/job-seeker/${authUser.id}/intro`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            setIntro(response.data)
            setLoading(false)
        }
        fetchExisting()
    }, [authToken, authUser])

    return (
        <CenteredHeaderCard
            glassEffect={onUpdate ? false : true}
            title={"Express yourself"}
            footer={
                <Stack direction="row" spacing={2}>
                    {
                        !onUpdate ? (
                            <>
                                <Box sx={{ width: '100%' }}>
                                <RouterLink to="/signup/user/seeker/profile/qualification">
                                    <Button variant='outlined' sx={{ width: '100%' }}>Back</Button>
                                </RouterLink>
                                </Box>
                                <Box sx={{ width: '100%' }}>
                                    <RouterLink to="/signup/user/dp">
                                        <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                                    </RouterLink>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ width: '100%' }}>
                                    <Button variant='outlined' sx={{ width: '100%' }} onClick={onCancel}>Cancel</Button>
                                </Box>
                            </>
                        )
                    }
                    <Box sx={{ width: '100%' }}>
                        <Button variant='contained' sx={{ width: '100%' }} onClick={updateIntro} disabled={intro === "" || loading}>Continue</Button>
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
            label='Introduction (Optional)'
            multiline
            value={intro}
            onChange={(e) => { setIntro(e.target.value) }}
            rows={8}
        />
        </Stack>
        </CenteredHeaderCard>
  )
})
