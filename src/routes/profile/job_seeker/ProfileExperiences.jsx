import { Alert, AlertTitle, CircularProgress, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ProfileExperiences = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ experiences, setExperiences ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/job-seeker/${userId}/experiences`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setExperiences(response.data)
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
            <SmallPanel mainTitle={"Experiences"} noElevation padding={{ xs: 1 }}>
                <Stack spacing={2}>
                    {
                        experiences.length !== 0 ? experiences.map( (experience, key) => (
                            <Stack direction={"row"} alignItems={'center'} spacing={2} color={"grey.800"} key={key}>
                                    <AvatarWithInitials src={experience.organization.displayPicture} name={experience.organization.displayName}/>
                                    <Stack>
                                        <Typography fontWeight={600}>{ experience.jobTitle.name }</Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography fontWeight={400}>{ experience.organization.displayName }</Typography>
                                            <Typography fontWeight={300}>{ `(${experience.startYear} - ${experience.endYear})` }</Typography>
                                        </Stack>
                                    </Stack>
                            </Stack>
                        )) : (
                            <Typography>Nothing to show here</Typography>
                        )
                    }
                </Stack>
            </SmallPanel>
        </Stack>
    )
}
