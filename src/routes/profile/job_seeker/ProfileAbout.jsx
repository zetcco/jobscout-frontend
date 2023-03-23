import { CallRounded, EmailRounded } from '@mui/icons-material'
import { Alert, AlertTitle, Box, CircularProgress, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ProfileAbout = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ about, setAbout ] = useState({
        intro: null,
        email: null,
        phone: null
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/user/${userId}/contacts`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setAbout(response.data)
                if (response.data.role === "ROLE_JOB_SEEKER") {
                    const response = await axios.get(`/job-seeker/${userId}/intro`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                    setAbout((prevState) => ({ ...prevState, intro: response.data }))
                }
            } catch (e) {
                setError(e.response.data)
            }
            setLoading(false)
        }
        fetchQualifications()
    }, [userId, authToken])

    if (loading)
        return (
            <Stack width={"100%"} alignItems={'center'}>
                <CircularProgress/>
            </Stack>
        )
    
    if (error)
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{error.message}</strong>
            </Alert>
        )

    return (
        <Stack spacing={3}>
            {   about.intro && (
                <SmallPanel mainTitle={"Introduction"} noElevation padding={{ xs: 1 }}>
                    <Typography>{about.intro}</Typography>
                </SmallPanel>
            )}
            <SmallPanel mainTitle={"Contact"} noElevation padding={{ xs: 1 }}>
                <Stack spacing={2}>
                    {
                        about.phone && (
                            <Stack direction={"row"} spacing={1} color={"grey.800"}>
                                <CallRounded/>
                                <Typography fontWeight={600}>{ about.phone }</Typography>
                            </Stack>
                        )
                    }
                    {
                        about.email && (
                            <Stack direction={"row"} spacing={1} color={"grey.800"}>
                                <EmailRounded/>
                                <Typography fontWeight={600}>{ about.email }</Typography>
                            </Stack>
                        )
                    }
                </Stack>
            </SmallPanel>
        </Stack>
    )
}
